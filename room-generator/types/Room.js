class Room {

    constructor() {}

    parseHTML (html) {
        var $ = cheerio.load(html);
        var room = {};
        room.name = $('#room-name').text();
        room.description = $('#room-description').text();
        room.exits = {};
        $('#room-exits').find('a').each(function() {
            var exit = $(this).attr('href');
            var direction = exit.substring(1, exit.length);
            room.exits[direction] = exit;
        });
        return room;
    }

}

module.exports = { Room };

/*
Tag:
<a href="#music" class="tag" target="_blank" rel="noopener">#music</a>
*/