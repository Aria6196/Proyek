let script = function(){
    
    this.showClock() = function(){ 
        var dateObj = new Date;
    
        let month = ['January', 'Februrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
        let year = dateObj.getFullYear();
        let monthNum = dateObj.getMonth();
        let dateCal = dateObj.getDate();
        let hour = dateObj.getHours();
        let min = dateObj.getMinutes();
        let sec = dateObj.getSeconds();
    
        document.querySelector(".timeAndDate").innerHTML = month[monthNum] + " " + dateCal + ", " + year + " " + hour + ":" + min + ":" + sec; 
        setInterval(showClock, 1000);
    }

};

let loadScript = new script;
script.initialize();




showClock();

