module dzknow::dzknow {
    use sui::coin::{Self, TreasuryCap};

    public struct DZKNOW has drop {}

    fun init(witness: DZKNOW, ctx: &mut TxContext) {
        let (treasury, metadata) = coin::create_currency(witness, 6, b"Super DZ", b"DZ", b"super dz coin", option::none(), ctx);
        transfer::public_share_object(metadata);
        transfer::public_transfer(treasury, ctx.sender())
    }

    public fun mint(
        treasury_cap: &mut TreasuryCap<DZKNOW>,
        amount: u64,
        recipient: address,
        ctx: &mut TxContext,
    ) {
        let coin = coin::mint(treasury_cap, amount, ctx);
        transfer::public_transfer(coin, recipient)
    }
}
