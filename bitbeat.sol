pragma solidity ^0.8.1;

contract SongData {

    struct Song{
        uint songId;
        string artistName;
        string albumName;
        string songName;
    }
    Song[] public Songs;
    uint public netxtSongId;

    function create(string memory name, string memory class) public
    {
        Songs.push(Song(netxtSongId, name, class));
        netxtSongId++;
    }

    function read(uint SongId ) view public returns(uint, string memory, string memory)
    {
        if(SongId < Songs.length && SongId>= 0)
        {
            return(Songs[SongId].Id, Songs[SongId].SongName, Songs[SongId].class);
        }
        revert("Song doesn't exist");
    }
    function update(uint SongId, string memory SongName, string memory SongClass) public
    {
        if(SongId < Songs.length && SongId>= 0)
        {
            Songs[SongId].SongName  = SongName;
            Songs[SongId].class = SongClass;
        }

    }
    function destroy(uint SongId) public
    {
        if(SongId < Songs.length && SongId>= 0)
        {
            delete Songs[SongId];
        }
    }

}