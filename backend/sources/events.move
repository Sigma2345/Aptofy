module onchainradio::events {

    use aptos_framework::event;

    friend onchainradio::songs ;

    #[event] 
    struct ContractPublished has drop, store {
        admin_address: address
    }

    #[event]
    struct CreatorAdded has drop, store {
        creator_address: address,
        timestamp: u64
    }

    #[event]
    struct SongPublished has drop, store {
        creator_address: address,
        title: vector<u8>,
        uri: vector<u8>,
        timestamp: u64
    }

    public(friend) fun emit_contract_published(
        _admin_address: address
    ) {
        event::emit(ContractPublished {
            admin_address: _admin_address
        });
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

    public(friend) fun emit_song_published(
        creator_address: address,
        title: vector<u8>,
        uri: vector<u8>,
        timestamp: u64
    ) {
        event::emit(SongPublished {
            creator_address,
            title,
            uri,
            timestamp
        });
    }

}
