
#[test_only, allow(deprecated_usage)]
module suirandom::sui_scratcher_whitelist_test;

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
    test_utils::assert_eq,
    test_utils::assert_ref_eq
};

// 測試幣OTW
public struct SUI_SCRATCHER_WHITELIST_TEST has drop {}
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
    let otw = create_one_time_witness<SUI_SCRATCHER_WHITELIST_TEST>();
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
    cap.add_whitelist_coin<SUI_SCRATCHER_WHITELIST_TEST>(&mut whitelist, &meta);
    cap.whitelist_flag(&mut whitelist);

    // read coin type from whitelist
    ts.next_tx(user[1]);
    assert_eq(whitelist.read_whitelist_coin<SUI_SCRATCHER_WHITELIST_TEST>(), true);
    assert_eq(!whitelist.read_whitelist_coin<SUI>(), true);
    assert_eq(whitelist.read_whitelist_coin_decimals<SUI_SCRATCHER_WHITELIST_TEST>(), 6);

    // create common pool by whitelist.
    ts.next_tx(user[1]);
    whitelist.create_shop_whitelist<SUI_SCRATCHER_WHITELIST_TEST>(ts.ctx());

    ts.next_tx(user[1]);
    let mut shop: suirandom::Game_Shop<SUI_SCRATCHER_WHITELIST_TEST> = ts.take_shared();


    ts::return_shared(shop);
    cap.destroy_cap();
    destroy(meta);
    destroy(_treasury);
    ts::return_shared(whitelist);
    ts::return_shared(random_state);
    ts.end();
}

#[test, expected_failure]
fun test_shop_create_flow_wl_false() {
    let user: vector<address> = vector<address> [
        @0x0,
        @0x1
    ];
    let mut ts = ts::begin(user[0]);
    // Setup CoinMeta
    // let meta = coin::create_treasury_cap_for_testing<COIN_TESTS>(ts.ctx());
    let otw = create_one_time_witness<SUI_SCRATCHER_WHITELIST_TEST>();
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
    cap.add_whitelist_coin<SUI_SCRATCHER_WHITELIST_TEST>(&mut whitelist, &meta);
    cap.whitelist_flag(&mut whitelist); // flag must be true
    cap.whitelist_flag(&mut whitelist); // test turn off flag

    // read coin type from whitelist
    ts.next_tx(user[1]);
    assert_eq(whitelist.read_whitelist_coin<SUI_SCRATCHER_WHITELIST_TEST>(), true);
    assert_eq(!whitelist.read_whitelist_coin<SUI>(), true);
    assert_eq(whitelist.read_whitelist_coin_decimals<SUI_SCRATCHER_WHITELIST_TEST>(), 6);

    // create common pool by whitelist.
    ts.next_tx(user[1]);
    whitelist.create_shop_whitelist<SUI_SCRATCHER_WHITELIST_TEST>(ts.ctx());

    ts.next_tx(user[1]);
    let mut shop: suirandom::Game_Shop<SUI_SCRATCHER_WHITELIST_TEST> = ts.take_shared();


    ts::return_shared(shop);
    cap.destroy_cap();
    destroy(meta);
    destroy(_treasury);
    ts::return_shared(whitelist);
    ts::return_shared(random_state);
    ts.end();
}

// 輪子
// 創建SUIRANDOM貨幣
#[test_only]
fun test_env(otw:SUI_SCRATCHER_WHITELIST_TEST, ts: &mut Scenario): (TreasuryCap<SUI_SCRATCHER_WHITELIST_TEST>, CoinMetadata<SUI_SCRATCHER_WHITELIST_TEST>) {
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
