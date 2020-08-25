/**
 * Reformats the data to be used in the all positions challenge.
 * 
 * @param {object} data The raw data with all races for a given period of time.
 * @param {number} maxPosition The lowest position that can be awarded. 
 * @returns {object} An object with the all positions stats data.
 */
export const allPositionsChallenge = (data, maxPosition) => {
    let newData = [];
    for(let i = 0; i < maxPosition; i++) {
        let obj = { position: (i + 1), total: 0, track_season: [] };

        data.map((x) => {
            if(obj.position == x.finishing_position) {
                obj.total++;
                obj.track_season.push({ trackid: x.trackid, year: x.season_year, season: x.season_quarter, week: x.race_week_num });
            }
        });

        newData.push(obj);
    }
    return newData;
}
