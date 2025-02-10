
#[test_only]
module suirandom::suirandom_tests;

use suirandom::suirandom;
use std::string;
use sui::{random::{Self, Random}, test_scenario as ts};

#[test]
fun test_e2e() {
    /*
    let user0 = @0x0;
    let user1 = @0x1;
    let mut ts = ts::begin(user0);
    // Setup randomness
    random::create_for_testing(ts.ctx());
    ts.next_tx(user0);
    let mut random_state: Random = ts.take_shared();
    random_state.update_randomness_state_for_testing(
        0,
        x"1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F1F",
        ts.ctx(),
    );
    ts.next_tx(user1);
    // mint airdrops
    suirandom::test_init(ts.ctx());
    ts.next_tx(user1);
    let cap: suirandom::MintingCapability = ts.take_from_sender();
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

    nfts.destroy_empty();
    cap.destroy_cap();
    ts::return_shared(random_state);
    ts.end();*/
}

