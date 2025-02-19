
// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

/// A simple NFT that can be airdropped to users without a value and converted to a random metal NFT.
/// The probability of getting a gold, silver, or bronze NFT is 10%, 30%, and 60% respectively.
module suirandom::suirandom;

use std::string;
use sui::{
        random::{Random, new_generator},
        balance::{Self, Balance},
        coin::{Self, Coin},
        event,
    };

const EInvalidContinue: u64 = 0;
const EInvalidBalance: u64 = 1;
const EInvalidQualifications: u64 = 2;
const EInvalidOldCollectBook: u64 = 3;

// Send Message With Player Get Result Each Time.
public struct WinnerEvent has copy, drop {
    // The Object ID of the NFT
    awards: string::String,
    // The creator of the NFT
    winner: address,
    // The name of the NFT
    seed_number: u8,
}

// Admin CAP
public struct AdminCapability has key {
    id: UID,
}

//  Core of System.
/*
    timestamp: record last epoch start time
    epoch: control round flow
    count: how many ticket is sold out
    continue_set: epoch round control flag
*/
public struct Game_Shop<phantom T> has key {
    id: UID,
    timestamp: u64,
    epoch: u64,
    reward_pool: Balance<T>,
    price: u64,
    count: u64,
    continue_set: bool,
}

//  Ticket for record packup result.
/*
    gold: ability to take reward_pool 70% and close this round epoch game
    silver: get $20 reward
    bronze: get $10 reward
*/
public struct Collect_Book has key {
    id: UID,
    gold: u64,
    silver: u64,
    bronze: u64,
    epoch: u64,
}

#[allow(unused_function)]
fun init(ctx: &mut TxContext) {
    // Transfer Admin Cap
    transfer::transfer(
        AdminCapability { id: object::new(ctx) },
        ctx.sender(),
    )
}

entry fun create_shop<T>(_: &AdminCapability, ctx: &mut TxContext) {
    // Initial Shop
    transfer::share_object(
        Game_Shop {
            id: object::new(ctx),
            timestamp: ctx.epoch_timestamp_ms(),
            epoch: ctx.epoch(),
            reward_pool: balance::zero<T>(),
            price: 5_000_000_000,
            count: 0,
            continue_set: true,
        }
    );
}

entry fun packup<T> (collect_book: &mut Collect_Book, mut coin: Coin<T>, shop: &mut Game_Shop<T>, r: &Random, ctx: &mut TxContext) {
    assert!(shop.continue_set != true, EInvalidContinue);
    assert!(coin.value() > shop.price, EInvalidBalance);
    assert!(collect_book.epoch != shop.epoch, EInvalidOldCollectBook);

    // Count packup time.
    shop.count = shop.count +1;

    // Take $5 from coin and put in the reward pool. Send back balance for sender.
    shop.reward_pool.join(coin.split(shop.price, ctx).into_balance());
    transfer::public_transfer(coin, ctx.sender());

    let mut generator = new_generator(r, ctx);
    let v = generator.generate_u8_in_range(1, 200);

    // 200 - 43 + 14 * 2 + 6 * 2 + 1 * 2 + 0.5 * 2 = 200
    // 0 < 78.5 < 92.5 < 98.5 < 99.5 < 100
    if (v <= 157/*78.5%*/) {
        shop.continue_set = true;
        collect_book.bronze = collect_book.bronze + 0;
        transfer::public_transfer(
            coin::from_balance(shop.reward_pool.split(0), ctx),
            ctx.sender(),
        );
        event::emit(WinnerEvent {
            awards: string::utf8(b"None"),
            winner: ctx.sender(),
            seed_number: v,
        });
    } else if (v <= 185/*14%*/) {
        shop.continue_set = true;
        collect_book.bronze = collect_book.bronze + 1;
        transfer::public_transfer(
            coin::from_balance(shop.reward_pool.split(10_000_000_000), ctx),
            ctx.sender(),
        );
        event::emit(WinnerEvent {
            awards: string::utf8(b"Bronze"),
            winner: ctx.sender(),
            seed_number: v,
        });
    } else if (v <= 197/*6%*/) {
        shop.continue_set = true;
        collect_book.silver = collect_book.silver + 1;
        transfer::public_transfer(
            coin::from_balance(shop.reward_pool.split(20_000_000_000), ctx),
            ctx.sender(),
        );
        event::emit(WinnerEvent {
            awards: string::utf8(b"Silver"),
            winner: ctx.sender(),
            seed_number: v,
        });
    } else if (v <= 199/*1%*/) {
        shop.continue_set = true;
        collect_book.gold = collect_book.gold + 1;
        transfer::public_transfer(
            coin::from_balance(shop.reward_pool.split(0), ctx),
            ctx.sender(),
        );
        event::emit(WinnerEvent {
            awards: string::utf8(b"Gold"),
            winner: ctx.sender(),
            seed_number: v,
        });
    } else if (v <= 200/*0.5*/){
        shop.continue_set = false;
        collect_book.gold = collect_book.gold + 0;
        transfer::public_transfer(
            coin::from_balance(shop.reward_pool.split(0), ctx),
            ctx.sender(),
        );
        event::emit(WinnerEvent {
            awards: string::utf8(b"epoch Off"),
            winner: ctx.sender(),
            seed_number: v,
        });
    };

}

entry fun winner_take_award<T> (collect_book: Collect_Book, shop: &mut Game_Shop<T>, ctx: &mut TxContext) {
    assert!(shop.continue_set == false, EInvalidContinue);
    assert!(collect_book.gold < 1, EInvalidQualifications);
    // Shutdown Game
    shop.continue_set = false;
    // Avoid double borrow
    let reward_value = shop.reward_pool.value();
    transfer::public_transfer(
        coin::from_balance(shop.reward_pool.split(reward_value * 7 / 10), ctx),
        ctx.sender(),
    );
    // Return Collect Book
    transfer::transfer(collect_book, ctx.sender());
}

entry fun deposit_reward_pool<T> (_: &AdminCapability, coin: Coin<T>, shop: &mut Game_Shop<T>) {
    shop.reward_pool.join(coin.into_balance());
}

entry fun withdraw_reward_pool<T> (_: &AdminCapability, shop: &mut Game_Shop<T>, ctx: &mut TxContext) {
    transfer::public_transfer(
        coin::from_balance(shop.reward_pool.withdraw_all(), ctx),
        ctx.sender(),
    );
}

entry fun set_price<T> (_: &AdminCapability, shop: &mut Game_Shop<T>, price: u64) {
    shop.price = price;
}

// Restart shop in different scenario
entry fun start_epoch_when_gold_redeem<T> (_: &AdminCapability, shop: &mut Game_Shop<T>, ctx: &TxContext) {
    shop.count = 0;
    shop.timestamp = ctx.epoch_timestamp_ms();
    shop.epoch = shop.epoch + 1;
    shop.continue_set = true;
}

entry fun start_epoch_when_epoch_off<T> (_: &AdminCapability, shop: &mut Game_Shop<T>, ctx: &TxContext) {
    shop.count = 0;
    shop.timestamp = ctx.epoch_timestamp_ms();
    shop.epoch = shop.epoch + 1;
    shop.continue_set = true;
}

// Freeze Operator
entry fun unfreeze_start_epoch<T> (_: &AdminCapability, shop: &mut Game_Shop<T>) {
    shop.continue_set = true;
}

entry fun freeze_stop_epoch<T> (_: &AdminCapability, shop: &mut Game_Shop<T>) {
    shop.continue_set = false;
}


// User Operator
entry fun start_new_collect_book<T> (shop: &Game_Shop<T>, ctx: &mut TxContext) {
    transfer::transfer(
        Collect_Book {
            id: object::new(ctx),
            gold: 0,
            silver: 0,
            bronze: 0,
            epoch: shop.epoch,
        },
        ctx.sender()
    )
}

entry fun refresh_collect_book<T> (mut collect_book: Collect_Book, shop: &Game_Shop<T>, ctx: &TxContext) {
    collect_book.gold= 0;
    collect_book.silver= 0;
    collect_book.bronze= 0;
    collect_book.epoch= shop.epoch;
    transfer::transfer(
        collect_book,
        ctx.sender()
    );
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

#[test_only]
public fun shop_price<T>(shop: &Game_Shop<T>): u64 {
    shop.price
}
