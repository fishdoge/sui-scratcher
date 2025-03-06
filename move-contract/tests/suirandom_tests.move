
#[test_only, allow(deprecated_usage)]
module suirandom::suirandom_tests;

use std::{
    debug
};
use suirandom::suirandom::{
    Self,
    WinnerEvent
};
use sui::{
    random::{Self, Random}, 
    test_scenario::{Self as ts, Scenario},
    coin::{Self, TreasuryCap, CoinMetadata},
    url,
    event,
    test_utils::create_one_time_witness,
    test_utils::destroy,
    test_utils::assert_eq
};

// 測試幣OTW
public struct SUIRANDOM_TESTS has drop {}
// 隨機數種子
const RANDOM_SEED: vector<u8> = x"1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F";
// 獎金池初始深度 = 價格 ＊ Deposit Deep
const Deposit_Deep:u64 = 20;

#[test]
fun test_e2e() {
    let user0 = @0x0;
    let user1 = @0x1;
    let mut ts = ts::begin(user0);
    // Setup CoinMeta
    // let meta = coin::create_treasury_cap_for_testing<COIN_TESTS>(ts.ctx());
    let otw = create_one_time_witness<SUIRANDOM_TESTS>();
    let (_treasury, meta) = test_env(otw, &mut ts);
    // Setup randomness
    random::create_for_testing(ts.ctx());
    ts.next_tx(user0);
    let mut random_state: Random = ts.take_shared();
    random_state.update_randomness_state_for_testing(
        0,
        RANDOM_SEED,
        ts.ctx(),
    );
    
    // init Scratch package
    ts.next_tx(user1);
    suirandom::test_init(ts.ctx());

    // create shop
    ts.next_tx(user1);
    let cap: suirandom::AdminCapability = ts.take_from_sender();
    //let meta: coin::CoinMetadata<COIN_TESTS> = ts.take_shared();
    cap.create_shop<SUIRANDOM_TESTS>(&meta, ts.ctx());

    // set_price
    ts.next_tx(user1);
    let mut shop: suirandom::Game_Shop<SUIRANDOM_TESTS> = ts.take_shared();
    //cap.set_price<SUIRANDOM_TESTS>(&mut shop, 5_000_000);

    debug::print(&shop.shop_price());

    // deposit_reward_pool
    ts.next_tx(user1);
    let c = coin::mint_for_testing<SUIRANDOM_TESTS>(shop.shop_price() * Deposit_Deep ,ts.ctx());
    cap.deposit_reward_pool<SUIRANDOM_TESTS>(c, &mut shop);

    // start_new_collect_book
    ts.next_tx(user1);
    suirandom::start_new_collect_book<SUIRANDOM_TESTS>(&shop, ts.ctx());

    // packup
    ts.next_tx(user1);
    let mut collectbook : suirandom::Collect_Book = ts.take_from_sender();
    let c2 = coin::mint_for_testing<SUIRANDOM_TESTS>(100_000_000/*shop.shop_price()*2*/,ts.ctx());
    suirandom::packup<SUIRANDOM_TESTS>(
        &mut collectbook, 
        c2, 
        &mut shop,
        &random_state,
        ts.ctx()
        );
    //
    debug::print(&event::events_by_type<WinnerEvent>().length());
    debug::print(&event::events_by_type<WinnerEvent>()[0].seed());
    assert_eq(event::events_by_type<WinnerEvent>().length(),shop.shop_count());

    
    /*
    let mut nfts = cap.mint(20, ts.ctx());
    let mut seen_gold = false;
    let mut seen_silver = false;
    let mut seen_bronze = false;
    let mut i = 0;
    while (i < 20) {
        if (i % 2 == 1) {
            nfts.pop_back().reveal(&random_state, ts.ctx())
        } else {
            nfts.pop_back().reveal_alternative1(&random_state, ts.ctx())
        };

        ts.next_tx(user1);
        let nft: suirandom::MetalNFT = ts.take_from_sender();
        let metal = nft.metal_string();
        seen_gold = seen_gold || metal == string::utf8(b"Gold");
        seen_silver = seen_silver || metal == string::utf8(b"Silver");
        seen_bronze = seen_bronze || metal == string::utf8(b"Bronze");
        ts.return_to_sender(nft);
        i = i + 1;
    };

    assert!(seen_gold && seen_silver && seen_bronze, 1);

    nfts.destroy_empty();*/
    collectbook.destroy_collect_book();
    cap.destroy_cap();
    destroy(meta);
    destroy(_treasury);
    ts::return_shared(shop);
    ts::return_shared(random_state);
    ts.end();
}

#[test]
fun test_shuffle() {
    let mut scenario = ts::begin(@0x0);

    random::create_for_testing(scenario.ctx());
    scenario.next_tx(@0x0);

    let mut random_state = scenario.take_shared<Random>();
    random_state.update_randomness_state_for_testing(
        0,
        RANDOM_SEED,
        scenario.ctx(),
    );

    let mut gen = random_state.new_generator(scenario.ctx());
    let mut v: vector<u16> = vector[0, 1, 2, 3, 4];
    gen.shuffle(&mut v);
    assert!(v.length() == 5);
    let mut i: u16 = 0;
    while (i < 5) {
        assert!(v.contains(&i));
        i = i + 1;
    };
    debug::print(&v);

    // check that numbers indeed eventaually move to all positions
    loop {
        gen.shuffle(&mut v);
        if ((v[4] == 1u16)) break;
    };
    loop {
        gen.shuffle(&mut v);
        if ((v[0] == 2u16)) break;
    };

    let mut v: vector<u32> = vector[];
    gen.shuffle(&mut v);
    assert!(v.length() == 0);

    let mut v: vector<u32> = vector[321];
    gen.shuffle(&mut v);
    assert!(v.length() == 1);
    assert!(v[0] == 321u32);

    ts::return_shared(random_state);
    scenario.end();
}


// 輪子
// 創建SUIRANDOM貨幣
#[test_only]
fun test_env(otw:SUIRANDOM_TESTS, ts:&mut Scenario): (TreasuryCap<SUIRANDOM_TESTS>, CoinMetadata<SUIRANDOM_TESTS>) {
    let (treasury, meta) = coin::create_currency(
        otw,
        6,
        b"COIN_TESTS",
        b"coin_name",
        b"description",
        option::some(url::new_unsafe_from_bytes(b"icon_url")),
        ts.ctx()
    );
    (treasury, meta)
}

