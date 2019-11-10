var Mensajero = function(id,name,surname,car,color,marker) {
    this.id=id;
    this.name = name;
    this.surname=surname;
    this.car=car;
    this.color = color;
    this.marker=marker;
    this.historyPositions =[];

    var actualIx = 0;


    this.addRuta=function(historyPositions)
    {
        this.historyPositions=historyPositions;
    }




    this.go = function(callback) {
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

