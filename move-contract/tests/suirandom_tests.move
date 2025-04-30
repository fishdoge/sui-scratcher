
#[test_only, allow(deprecated_usage)]
module suirandom::suirandom_tests;

use std::{
    debug,
    string,
    vector
};
use suirandom::suirandom::{
    Self,
    WinnerEvent
};
use sui::{
    sui::SUI,
    random::{Self, Random}, 
    test_scenario::{Self as ts, Scenario},
    coin::{Self, TreasuryCap, CoinMetadata, Coin},
    clock::Clock,
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
fun test_shop_create_flow() {
    let user: vector<address> = vector<address> [
        @0x0,
        @0x1
    ];
    let mut ts = ts::begin(user[0]);
    // Setup CoinMeta
    // let meta = coin::create_treasury_cap_for_testing<COIN_TESTS>(ts.ctx());
    let otw = create_one_time_witness<SUIRANDOM_TESTS>();
    let (_treasury, meta) = test_env(otw, &mut ts);
    // Setup randomness
    random::create_for_testing(ts.ctx());
    ts.next_tx(user[0]);
    let mut random_state: Random = ts.take_shared();
    random_state.update_randomness_state_for_testing(
        0,
        RANDOM_SEED,
        ts.ctx(),
    );
    
    // init Scratch package
    ts.next_tx(user[1]);
    suirandom::test_init(ts.ctx());

    // add coin type to whitelist 
    ts.next_tx(user[1]);
    let cap: suirandom::AdminCapability = ts.take_from_sender();
    let mut whitelist: suirandom::WhiteListCapability = ts.take_shared();
    cap.add_whitelist_coin<SUIRANDOM_TESTS>(&mut whitelist, &meta);

    // create shop
    ts.next_tx(user[1]);
    //let meta: coin::CoinMetadata<COIN_TESTS> = ts.take_shared();
    cap.create_shop<SUIRANDOM_TESTS>(&mut whitelist, ts.ctx());

    // set_price
    ts.next_tx(user[1]);
    let mut shop: suirandom::Game_Shop<SUIRANDOM_TESTS> = ts.take_shared();
    //cap.set_price<SUIRANDOM_TESTS>(&mut shop, 5_000_000);

    debug::print(&shop.shop_price());

    // deposit_reward_pool
    ts.next_tx(user[1]);
    let c = coin::mint_for_testing<SUIRANDOM_TESTS>(shop.shop_price() * Deposit_Deep ,ts.ctx());
    cap.deposit_reward_pool<SUIRANDOM_TESTS>(&mut shop, c);

    // start_new_collect_book
    ts.next_tx(user[1]);
    suirandom::start_new_collect_book<SUIRANDOM_TESTS>(&shop, ts.ctx());

    // packup
    ts.next_tx(user[1]);
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

    ts.next_tx(user[1]);
    debug::print(&collectbook.is_winner());
    debug::print(&collectbook.is_winner());
    debug::print(&collectbook.is_winner());
    debug::print(&collectbook.is_winner());
    
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

        ts.next_tx(user[1]);
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
    destroy(collectbook);
    cap.destroy_cap();
    destroy(meta);
    destroy(_treasury);
    ts::return_shared(shop);
    ts::return_shared(whitelist);
    ts::return_shared(random_state);
    ts.end();
}

#[test, expected_failure]
fun test_cross_shop_get_reward() {
    let user: vector<address> = vector<address> [
        @0x0,
        @0x1
    ];
    let mut ts = ts::begin(user[0]);
    // Setup CoinMeta
    let otw = create_one_time_witness<SUIRANDOM_TESTS>();
    let (_treasury, meta) = test_env(otw, &mut ts);
    // Setup randomness
    random::create_for_testing(ts.ctx());
    ts.next_tx(user[0]);
    let mut random_state: Random = ts.take_shared();
    random_state.update_randomness_state_for_testing(
        0,
        RANDOM_SEED,
        ts.ctx(),
    );
    
    // init Scratch package
    ts.next_tx(user[1]);
    suirandom::test_init(ts.ctx());

    // add coin type to whitelist 
    ts.next_tx(user[1]);
    let cap: suirandom::AdminCapability = ts.take_from_sender();
    let mut whitelist: suirandom::WhiteListCapability = ts.take_shared();
    cap.add_whitelist_coin<SUIRANDOM_TESTS>(&mut whitelist, &meta);

    // create shop 1
    ts.next_tx(user[1]);
    cap.create_shop<SUIRANDOM_TESTS>(&mut whitelist, ts.ctx());

    // create shop 2
    ts.next_tx(user[1]);
    cap.create_shop<SUIRANDOM_TESTS>(&mut whitelist, ts.ctx());

    // set_price
    ts.next_tx(user[1]);
    let mut shop1: suirandom::Game_Shop<SUIRANDOM_TESTS> = ts.take_shared();
    cap.set_price<SUIRANDOM_TESTS>(&mut shop1, 3_000_000);
    // get price of shop 1. 
    ts.next_tx(user[1]);
    debug::print(&shop1.shop_price());

    // get price of shop 2. 
    ts.next_tx(user[1]);
    let mut shop2: suirandom::Game_Shop<SUIRANDOM_TESTS> = ts.take_shared();
    debug::print(&shop2.shop_price());

    // deposit_reward_pool
    ts.next_tx(user[1]);
    let c = coin::mint_for_testing<SUIRANDOM_TESTS>(shop1.shop_price() * Deposit_Deep ,ts.ctx());
    cap.deposit_reward_pool<SUIRANDOM_TESTS>(&mut shop1, c);
    ts.next_tx(user[1]);
    let c = coin::mint_for_testing<SUIRANDOM_TESTS>(shop2.shop_price() * Deposit_Deep ,ts.ctx());
    cap.deposit_reward_pool<SUIRANDOM_TESTS>(&mut shop2, c);

    // start_new_collect_book -> shop1
    ts.next_tx(user[1]);
    suirandom::start_new_collect_book<SUIRANDOM_TESTS>(&shop1, ts.ctx());
    // packup
    ts.next_tx(user[1]);
    let mut collectbook1 : suirandom::Collect_Book = ts.take_from_sender();
    let c2 = coin::mint_for_testing<SUIRANDOM_TESTS>(shop1.shop_price()*20,ts.ctx());
    suirandom::packup<SUIRANDOM_TESTS>(
        &mut collectbook1, 
        c2, 
        &mut shop1,
        &random_state,
        ts.ctx()
        );
    // Debug Message
    debug::print(&string::utf8(b"shop1 data"));
    debug::print(&event::events_by_type<WinnerEvent>().length());
    debug::print(&event::events_by_type<WinnerEvent>()[0].seed());
    assert_eq(event::events_by_type<WinnerEvent>().length(),shop1.shop_count());


    // start_new_collect_book -> shop2
    ts.next_tx(user[1]);
    suirandom::start_new_collect_book<SUIRANDOM_TESTS>(&shop2, ts.ctx());
    // packup
    ts.next_tx(user[1]);
    let mut collectbook2 : suirandom::Collect_Book = ts.take_from_sender();
    let c2 = coin::mint_for_testing<SUIRANDOM_TESTS>(shop2.shop_price()*20,ts.ctx());
    suirandom::packup<SUIRANDOM_TESTS>(
        &mut collectbook2, 
        c2, 
        &mut shop2,
        &random_state,
        ts.ctx()
        );
    // Debug Message
    debug::print(&string::utf8(b"shop2 data"));
    debug::print(&event::events_by_type<WinnerEvent>().length());
    debug::print(&event::events_by_type<WinnerEvent>()[0].seed());
    assert_eq(event::events_by_type<WinnerEvent>().length(),shop2.shop_count());

    // Gift Biggest Reward
    collectbook1 = collectbook1.gift_collect_book_biggest_reward();
    collectbook2 = collectbook2.gift_collect_book_biggest_reward();

    // Winner Take Reward
    ts.next_tx(user[1]);
    collectbook1.winner_take_reward(&mut shop2, ts.ctx());

    
    // Destroy Or Return Object.
    destroy(collectbook1);
    destroy(collectbook2);
    destroy(cap);
    destroy(meta);
    destroy(_treasury);
    ts::return_shared(shop1);
    ts::return_shared(shop2);
    ts::return_shared(whitelist);
    ts::return_shared(random_state);
    ts.end();
}

#[test]
fun test_long_run_shop_get_reward() {
    let user: vector<address> = vector<address> [
        @0x0,
        @0x1
    ];
    let mut ts = ts::begin(user[0]);
    // Setup CoinMeta
    let otw = create_one_time_witness<SUIRANDOM_TESTS>();
    let (_treasury, meta) = test_env(otw, &mut ts);
    // Setup randomness
    random::create_for_testing(ts.ctx());
    ts.next_tx(user[0]);
    let mut random_state: Random = ts.take_shared();
    random_state.update_randomness_state_for_testing(
        0,
        RANDOM_SEED,
        ts.ctx(),
    );
    
    // init Scratch package
    ts.next_tx(user[1]);
    suirandom::test_init(ts.ctx());

    // add coin type to whitelist 
    ts.next_tx(user[1]);
    let cap: suirandom::AdminCapability = ts.take_from_sender();
    let mut whitelist: suirandom::WhiteListCapability = ts.take_shared();
    cap.add_whitelist_coin<SUIRANDOM_TESTS>(&mut whitelist, &meta);

    // create shop 1
    ts.next_tx(user[1]);
    cap.create_shop<SUIRANDOM_TESTS>(&mut whitelist, ts.ctx());

    // create shop 2
    ts.next_tx(user[1]);
    cap.create_shop<SUIRANDOM_TESTS>(&mut whitelist, ts.ctx());

    // set_price
    ts.next_tx(user[1]);
    let mut shop1: suirandom::Game_Shop<SUIRANDOM_TESTS> = ts.take_shared();
    cap.set_price<SUIRANDOM_TESTS>(&mut shop1, 3_000_000);
    // get price of shop 1. 
    ts.next_tx(user[1]);
    debug::print(&shop1.shop_price());

    // get price of shop 2. 
    ts.next_tx(user[1]);
    let mut shop2: suirandom::Game_Shop<SUIRANDOM_TESTS> = ts.take_shared();
    debug::print(&shop2.shop_price());

    // deposit_reward_pool
    ts.next_tx(user[1]);
    let c = coin::mint_for_testing<SUIRANDOM_TESTS>(shop1.shop_price() * Deposit_Deep ,ts.ctx());
    cap.deposit_reward_pool<SUIRANDOM_TESTS>( &mut shop1, c);
    ts.next_tx(user[1]);
    let c = coin::mint_for_testing<SUIRANDOM_TESTS>(shop2.shop_price() * Deposit_Deep ,ts.ctx());
    cap.deposit_reward_pool<SUIRANDOM_TESTS>( &mut shop2, c);

    // start_new_collect_book -> shop1
    ts.next_tx(user[1]);
    suirandom::start_new_collect_book<SUIRANDOM_TESTS>(&shop1, ts.ctx());
    // packup
    ts.next_tx(user[1]);
    let mut collectbook1 : suirandom::Collect_Book = ts.take_from_sender();
    let c2 = coin::mint_for_testing<SUIRANDOM_TESTS>(shop1.shop_price()*20,ts.ctx());
    suirandom::packup<SUIRANDOM_TESTS>(
        &mut collectbook1, 
        c2, 
        &mut shop1,
        &random_state,
        ts.ctx()
        );
    // Debug Message
    debug::print(&string::utf8(b"shop1 data"));
    debug::print(&event::events_by_type<WinnerEvent>().length());
    debug::print(&event::events_by_type<WinnerEvent>()[0].seed());
    assert_eq(event::events_by_type<WinnerEvent>().length(),shop1.shop_count());


    // start_new_collect_book -> shop2
    ts.next_tx(user[1]);
    suirandom::start_new_collect_book<SUIRANDOM_TESTS>(&shop2, ts.ctx());
    // packup
    ts.next_tx(user[1]);
    let mut collectbook2 : suirandom::Collect_Book = ts.take_from_sender();
    let c2 = coin::mint_for_testing<SUIRANDOM_TESTS>(shop2.shop_price()*20,ts.ctx());
    suirandom::packup<SUIRANDOM_TESTS>(
        &mut collectbook2, 
        c2, 
        &mut shop2,
        &random_state,
        ts.ctx()
        );
    // Debug Message
    debug::print(&string::utf8(b"shop2 data"));
    debug::print(&event::events_by_type<WinnerEvent>().length());
    debug::print(&event::events_by_type<WinnerEvent>()[0].seed());
    assert_eq(event::events_by_type<WinnerEvent>().length(),shop2.shop_count());

    // Gift Biggest Reward
    collectbook1 = collectbook1.gift_collect_book_biggest_reward();
    collectbook2 = collectbook2.gift_collect_book_biggest_reward();

    // Winner Take Reward
    ts.next_tx(user[1]);
    collectbook1.winner_take_reward(&mut shop1, ts.ctx());

    
    // Destroy Or Return Object.
    destroy(collectbook1);
    destroy(collectbook2);
    destroy(cap);
    destroy(meta);
    destroy(_treasury);
    ts::return_shared(shop1);
    ts::return_shared(shop2);
    ts::return_shared(whitelist);
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
fun test_env(otw:SUIRANDOM_TESTS, ts: &mut Scenario): (TreasuryCap<SUIRANDOM_TESTS>, CoinMetadata<SUIRANDOM_TESTS>) {
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

#[test_only]
// Bridge environemnt
public struct TsEnv {
    scenario: Scenario,
    wallet_list: vector<address>,
    vault: Vault,
    clock: Clock,
}

#[test_only]
// Holds coins for different bridged tokens
public struct Vault {
    sui_coins: Coin<SUI>,
    test_coins: Coin<SUIRANDOM_TESTS>,
}

#[test_only]
fun wallet_list() : vector<address> {
    vector<address> [
        @0x0,
        @0x1
    ]
}

#[test_only]
fun test_ts_env() : TsEnv{
    let user: vector<address> = wallet_list();
    let mut ts = ts::begin(user[0]);
    let ctx = ts.ctx();
    let mut clock = sui::clock::create_for_testing(ctx);
    random::create_for_testing(ctx);
    clock.set_for_testing(1_000_000_000);
    let sui_coin = coin::zero<SUI>(ctx);
    let test_coin = coin::zero<SUIRANDOM_TESTS>(ctx);
    let vault = Vault {
        sui_coins: sui_coin,
        test_coins: test_coin,
    };
    TsEnv {
        scenario: ts ,
        wallet_list: user,
        vault: vault,
        clock: clock,
    }
}



#[test]
fun test_shop_create_flow_new() {

    let mut env = test_ts_env();
    let ts = &mut env.scenario;
    let user = &mut env.wallet_list;
    
    // Setup CoinMeta
    let otw = create_one_time_witness<SUIRANDOM_TESTS>();
    let (_treasury, meta) = test_env(otw, ts);
    
    // Setup randomness
    ts.next_tx(user[0]);
    let mut random_state: Random = ts.take_shared();
    random_state.update_randomness_state_for_testing(
        0,
        RANDOM_SEED,
        ts.ctx(),
    );
    
    // init Scratch package
    ts.next_tx(user[1]);
    suirandom::test_init(ts.ctx());

    // add coin type to whitelist 
    ts.next_tx(user[1]);
    let cap: suirandom::AdminCapability = ts.take_from_sender();
    let mut whitelist: suirandom::WhiteListCapability = ts.take_shared();
    cap.add_whitelist_coin<SUIRANDOM_TESTS>(&mut whitelist, &meta);

    // create shop
    ts.next_tx(user[1]);
    cap.create_shop<SUIRANDOM_TESTS>(&mut whitelist, ts.ctx());

    // set_price
    ts.next_tx(user[1]);
    let mut shop: suirandom::Game_Shop<SUIRANDOM_TESTS> = ts.take_shared();
    //cap.set_price<SUIRANDOM_TESTS>(&mut shop, 5_000_000);

    debug::print(&shop.shop_price());

    // deposit_reward_pool
    ts.next_tx(user[1]);
    let c = coin::mint_for_testing<SUIRANDOM_TESTS>(shop.shop_price() * Deposit_Deep ,ts.ctx());
    cap.deposit_reward_pool<SUIRANDOM_TESTS>(&mut shop, c);

    // start_new_collect_book
    ts.next_tx(user[1]);
    suirandom::start_new_collect_book<SUIRANDOM_TESTS>(&shop, ts.ctx());

    // packup
    ts.next_tx(user[1]);
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

        ts.next_tx(user[1]);
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
    destroy(collectbook);
    cap.destroy_cap();
    destroy(meta);
    destroy(_treasury);
    ts::return_shared(shop);
    ts::return_shared(random_state);
    //ts.end();
    env.destroy_env();
    ts::return_shared(whitelist);
}

public fun destroy_env(env: TsEnv) {
    let TsEnv {
        scenario,
        wallet_list:_,
        vault,
        clock,
    } = env;
    destroy_valut(vault);
    clock.destroy_for_testing();
    scenario.end();
}

// Destroy the vault
fun destroy_valut(vault: Vault) {
    let Vault {
        sui_coins,
        test_coins,
    } = vault;
    sui_coins.burn_for_testing();
    test_coins.burn_for_testing();
}