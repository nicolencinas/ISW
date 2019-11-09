var Mensajero = function(name,surname, color, historyPositions) {
    this.id=id;
    this.name = name;
    this.surname=surname;
    this.car=car;
	this.color = color;
    this.historyPositions = historyPositions;

    var actualIx = 0;






    this.run = function(callback) {
        var self = this;
        setTimeout(function() {
            callback(historyPositions[actualIx]);

            actualIx += 1;
            if(actualIx < historyPositions.length) {
                self.run(callback);
            }
        }, 1000);
    }
};

