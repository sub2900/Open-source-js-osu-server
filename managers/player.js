class Player {
    constructor({
        id,
        username,
        passhash,
        privileges,
        ip = null,
        country = null,
        country_c = null,
        status = null,
        status_t = null,
        map_md5 = null,
        cur_mods = null,
        mode = null,
        map_id = null,
        channels = [],
        friends = [],
        game_match = null,
        r_score = null,
        acc = null,
        p_count = null,
        t_score = null,
        level = null,
        rank = null,
        pp = null,
        relax = null,
        queue = [],
        login_time = null,
        last_update = null,
        bot = false
    }) {
        this.id = id;
        this.username = username;
        this.passhash = passhash;
        this.privileges = privileges;

        this.ip = ip;

        this.country = country;
        this.country_c = country_c;

        this.status = status;
        this.status_t = status_t;
        this.map_md5 = map_md5;
        this.cur_mods = cur_mods;
        this.mode = mode;
        this.map_id = map_id;

        this.channels = channels;
        this.friends = friends;
        this.game_match = game_match;

        this.r_score = r_score;
        this.acc = acc;
        this.p_count = p_count;
        this.t_score = t_score;
        this.level = level;
        this.rank = rank;
        this.pp = pp;

        this.relax = relax;

        this.queue = queue;

        this.login_time = login_time;
        this.last_update = last_update;

        this.bot = bot;
    }

    getCurrentMode() {
        if (this.mode > 3) {
            throw new Error(`Unexpected error; this should never happen. (MODE: ${this.mode})`);
        }
        let modes = ['std', 'taiko', 'catch', 'mania'];
        return modes[this.mode];
    }

    async initializeStatsFromSql() {
        let table = (this.relax == 0) ? "stats" : "stats_relax";
        let mode = this.getCurrentMode();

       // Heads up: JavaScript can't do SQL stuff on its own.
// Normally, you'd use a library that helps with this, like an ORM or a raw connection library.
// For example, if you're using Node.js with MySQL, it'd look like this:
// let result = await runMySqlQuery("SELECT ...");

// But you'll need to do the SQL part yourself.
// Make sure to put in the right SQL command where it says TODO.
      
        this.r_score = result.r_score;
        this.t_score = result.t_score;
        this.acc = result.acc;
        this.p_count = result.p_score;
        this.level = result.level;
        this.pp = result.pp;
    }
}
