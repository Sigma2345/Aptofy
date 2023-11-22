module onchainradio::events {

    use aptos_framework::event;

    friend onchainradio::songs ;

    #[event]
    struct CreatorAdded has drop, store {
        creator_address: address,
        timestamp: u64
    }

    public(friend) fun emit_creator_added(
        creator_address: address,
        timestamp: u64
    ) {
        event::emit(CreatorAdded{
            creator_address,
            timestamp
        });
    }
}
