module onchainradio::songs {

    use std::signer;
    use onchainradio::events ;
    use aptos_framework::timestamp ;

    // ERRORS
    const ERROR_USER_NOT_CREATOR :u64 = 1;
    const ERROR_NOT_ADMIN: u64 = 2 ;
    const ERROR_ALREADY_CREATOR: u64 = 3;

    // CONSTANTS
    // change address afterwards
    // to change for governance
    const ADMIN: address = 0x1234 ;

    // struct Creator
    struct Creator has key, store {
        creator_address: address,
    }

    // struct Song
    struct Song has key, drop {
        creator: address,
        title: vector<u8>,
        URI: vector<u8>,
        description: vector<u8>
    }

    // publishing the song from creator
    public entry fun publishSong(
        _creator: &signer,
        _title: vector<u8>,
        _uri: vector<u8>,
        _description: vector<u8>
    ){
        let creator_address = signer::address_of(_creator);
        assert!(exists<Creator>(creator_address), ERROR_USER_NOT_CREATOR);
        let song = Song { creator: creator_address, title: _title, URI: _uri, description: _description } ;
        move_to(_creator, song);
        events::emit_song_published(
            creator_address,
            _title,
            _uri,
            timestamp::now_seconds()
        );
    }

    public entry fun AddCreator(
        _admin: &signer,
        creator_address: address
    ) {
        let admin_address = signer::address_of(_admin);
        assert!(isAdmin(admin_address), ERROR_NOT_ADMIN);
        assert!(!exists<Creator>(creator_address), ERROR_ALREADY_CREATOR);
        let creator = Creator { creator_address };
        move_to(_admin, creator);
        aptos_framework::aptos_account::transfer_coins<Creator>(_admin, creator_address, 1);
        events::emit_creator_added(creator_address, timestamp::now_seconds());
    }

    #[view]
    public fun isAdmin(account: address): bool {
        account == ADMIN
    }

    #[view]
    public fun isCreator(account: address): bool {
        exists<Creator>(account)
    }
}
