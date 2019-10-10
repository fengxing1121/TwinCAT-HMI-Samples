// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    var destroyOnInitialized = TcHmi.EventProvider.register('onInitialized', function (e, data) {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        e.destroy();

        document.addEventListener("click", TcHmiExampleCollection.Utilities.getClickPressCoordinates, true);
        document.addEventListener("press", TcHmiExampleCollection.Utilities.getClickPressCoordinates, true);
    });
})(TcHmi);
TcHmiExampleCollection.Utilities = {};
TcHmiExampleCollection.Utilities.checkImplementation = function () { if (TcHmiExampleCollection) { return true } };

if (!TcHmiExampleCollection.Utilities.checkImplementation()) {
    console.log("TcHmiExampleCollection.js needs to be loaded before.");
};

// Make elements draggable
TcHmiExampleCollection.Utilities.dragElement = function (elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + ".header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + ".header").onmousedown = dragMouseDown;
        //document.getElementById(elmnt.id + ".header").ontouchstart = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV: 
        elmnt.onmousedown = dragMouseDown;
        //elmnt.ontouchstart = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        //document.ontouchend = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
        //document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        //document.ontouchend = null;
        document.onmousemove = null;
        //document.ontouchmove = null;
}
}

// String utility functions
String.prototype.endsWith = function () {
    if ((this.lastIndexOf(arguments[0]) > -1) && (this.lastIndexOf(arguments[0])) == (this.length - arguments[0].length))
        return true;
    else
        return false;
};

String.prototype.startsWith = function () {
    if ((this.indexOf(arguments[0])) == 0)
        return true;
    else
        return false;
};

String.prototype.contains = function () {
    if ((this.indexOf(arguments[0])) > -1)
        return true;
    else
        return false;
};

// Switch view by name
TcHmiExampleCollection.Utilities.switchView = function (_name, _callback) {
    var v1 = TcHmi.View.get();
    TcHmi.Log.debug(v1.getId());
    TcHmi.View.load(_name + '.view', function (data) {
        var v2 = TcHmi.View.get();
        TcHmi.Log.debug(v2.getId());
        if (_callback && typeof _callback == "function")
            _callback();
    });
};

// Mouse press coordinates
TcHmiExampleCollection.Utilities.ClickPressCoordinates = {
    x: null,
    y: null
};

// Get mouse press coordinates
TcHmiExampleCollection.Utilities.getClickPressCoordinates = function (event) {
    TcHmiExampleCollection.Utilities.ClickPressCoordinates.x = event.clientX;
    TcHmiExampleCollection.Utilities.ClickPressCoordinates.y = event.clientY;
}

// Uuidv4 generator
TcHmiExampleCollection.Utilities.generateUuidv4 = function () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Scale values between two points
TcHmiExampleCollection.Utilities.TwoPointScaling = function (Value, xMin, xMax, yMin, yMax) {
    ratio = (Value - xMin) / (xMax - xMin);
    return ratio * (yMax - yMin) + yMin;
}

TcHmiExampleCollection.Utilities.CSV = {};

TcHmiExampleCollection.Utilities.CSV.convertArrayOfObjectsToCSV = function (args) {
    var result, ctr, keys, columnDelimiter, lineDelimiter, data;

    data = args.data || null;
    if (data == null || !data.length) {
        return null;
    }

    columnDelimiter = args.columnDelimiter || ',';
    lineDelimiter = args.lineDelimiter || '\n';

    for (let i = 0; i < data.length; i++) {
        if ('error' in data[i]) {
            data.splice(i, 1);
            i = i - 1;
        }
    }

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function (item) {
        ctr = 0;
        keys.forEach(function (key) {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];
            ctr++;
        });
        result += lineDelimiter;
    });

    return result;
}

// CSV download function
TcHmiExampleCollection.Utilities.CSV.downloadCSV = function (args, dataArray) {
    var data, filename, link;
    var csv = TcHmiExampleCollection.Utilities.CSV.convertArrayOfObjectsToCSV({
        data: dataArray
    });
    if (csv == null) return;

    filename = args.filename || 'export.csv';

    if (!csv.match(/^data:text\/csv/i)) {
        csv = 'data:text/csv;charset=utf-8,' + csv;
    }
    data = encodeURI(csv);

    link = document.createElement('a');
    link.setAttribute('href', data);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}