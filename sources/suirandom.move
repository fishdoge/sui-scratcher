
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/// A simple NFT that can be airdropped to users without a value and converted to a random metal NFT.
/// The probability of getting a gold, silver, or bronze NFT is 10%, 30%, and 60% respectively.
module suirandom::suirandom;

use usdc::usdc::USDC;
use std::{string, string::utf8};
use sui::{
    object::delete, 
    random::{Random, new_generator}, 
    url::Url,
    balance::{Self, Balance},
    coin::{Self, Coin},
    };

const EInvalidParams: u64 = 0;

const GOLD: u8 = 1;
const SILVER: u8 = 2;
const BRONZE: u8 = 3;

public struct AdminCapability has key {
    id: UID,
}

public struct Game_Shop has key {
    id: UID,
    timestamp: u64,
    epoch: u64,
    reward_pool: Balance<USDC>,
    price: u64,
    count: u64,
}

public struct Collect_Book has key {
    id: UID,
    gold: u64,
    silver: u64,
    bronze: u64,
}

#[allow(unused_function)]
fun init(ctx: &mut TxContext) {

    transfer::share_object(
        Game_Shop {
            id: object::new(ctx),
            timestamp: ctx.epoch_timestamp_ms(),
            epoch: ctx.epoch(),
            reward_pool: balance::zero<USDC>(),
            price: 5000000000,
            count: 0,
        }
    );

    transfer::transfer(
        AdminCapability { id: object::new(ctx) },
        ctx.sender(),
    )
}

entry fun packup (collect_book: &mut Collect_Book, mut usdc: Coin<USDC>, shop: &mut Game_Shop, r: &Random, ctx: &mut TxContext) {
    assert!(usdc.value() > 5000000000, EInvalidParams);
    
    shop.reward_pool.join(usdc.split(5000000000, ctx).into_balance());
    transfer::public_transfer(usdc, ctx.sender());

    let mut generator = new_generator(r, ctx);
    let v = generator.generate_u8_in_range(1, 100);

    if (v <= 49/*60*/) {
        //collect_book.bronze = collect_book.bronze + 1;
    } else if (v <= 50/*90*/) {
        //collect_book.silver = collect_book.silver + 1;
    } else if (v <= 100) {
        collect_book.gold = collect_book.gold + 1;
    };
}

#[test_only]
public fun destroy_cap(cap: AdminCapability) {
    let AdminCapability { id } = cap;
    object::delete(id)
}

#[test_only]
public struct CAPY has drop {}

#[test_only]
public fun test_init(ctx: &mut TxContext) {
    init(ctx)
}
