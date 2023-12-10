module onchainradio::songs{

    use aptos_framework::account;
    use aptos_framework::timestamp;
    use aptos_framework::event;
    use aptos_framework::aptos_coin::{AptosCoin}; 
    use aptos_framework::aptos_account::transfer_coins ; 
    use std::signer;
    use std::string::String;


    // ERRORS
    const ERROR_USER_NOT_CREATOR :u64 = 1;
    const ERROR_ALREADY_CREATOR :u64 = 2; 

    //events
    #[event]
    struct CreatorAdded has drop, store {
        creator_address: address, 
        name: String, 
        timestamp: u64
    }

    #[event]
    struct SongPublished has drop, store {
        creator_address: address,
        title: String, 
        uri: String, 
        timestamp: u64
    }

    // constants
    const ADMIN: address = @admin ;
    const PLATFORM_FEE_PERCENT: u64 = 5; 

    //structs

    struct Creator has key, store, drop {
        creator_address: address,
        name: String, 
        approved: bool,
        timestamp: u64
    }

    struct Song has key, store, drop {
        creator_address: address, 
        title: String, 
        uri: String, 
        description: String, 
        published: bool, 
        timestamp: u64
    }

    public entry fun add_creator(
        account: &signer, 
        _name: String, 

    ) {
        let _creator_address = signer::address_of(account); 
        assert!(!exists<Creator>(_creator_address), ERROR_ALREADY_CREATOR);
        let creator = Creator {
            creator_address: _creator_address, 
            name: _name, 
            approved: true, 
            timestamp: timestamp::now_seconds()
        }; 
        move_to(account, creator); 
        event::emit(CreatorAdded{
            creator_address: _creator_address, 
            name: _name, 
            timestamp:timestamp::now_seconds()
        })
    }

    public entry fun publish_song(
        account: &signer, 
        _title: String, 
        _uri: String, 
        _description: String
    ) {
        assert!(exists<Creator>(signer::address_of(account)), ERROR_USER_NOT_CREATOR); 
        let song = Song { 
            creator_address: signer::address_of(account), 
            title: copy _title, 
            uri: copy _uri, 
            description: copy _description, 
            published: true, 
            timestamp: timestamp::now_seconds() 
        };
        move_to(account, song);
        event::emit(
            SongPublished{
                creator_address: signer::address_of(account), 
                title: _title, 
                uri: _uri, 
                timestamp: timestamp::now_seconds()
            }
        )
    }

    public entry fun tip_artist(
        account: &signer, 
        amount: u64, 
        creator_address: address
    ) {
        let platformFee: u64 = (PLATFORM_FEE_PERCENT * amount) / 100 ; 
        let artistFee: u64 = amount - platformFee ; 
        transfer_coins<AptosCoin>(account, ADMIN, platformFee); 
        transfer_coins<AptosCoin>(account, creator_address, artistFee); 
    }

    #[view]
    public fun isCreator(account: address): bool {
        exists<Creator>(account)
    }

    #[view]
    public fun getCreatorName(account: address): String acquires Creator {
        borrow_global<Creator>(account).name
    } 

}

