module liquidlink_protocol::constant {
    
    const POINT_UPDATER: address = @0xd6a54ff7f851b58c19729c11d210d46fd46d702b9d9caff78747de1914c934ee;

    public fun point_updater():address{
        POINT_UPDATER
    }
}
