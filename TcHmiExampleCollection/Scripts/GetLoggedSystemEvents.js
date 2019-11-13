// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var GetLoggedSystemEvents = function () {
        if (TcHmi.Server.isWebsocketReady()) {
            var commands = [{
                "commandOptions": ["SendErrorMessage", "SendWriteValue"],
                "symbol": "ListEvents",
                "writeValue": [{
                    "path": "domain",
                    "comparator": "==",
                    "value": "TcHmiEventLogger"
                }
                ]
            }
            ]
            ;

            var SubscriptionID = TcHmi.Server.subscribe(commands, 2000, function (data) {
                var csvData = [];
                for (let i = 0; i < data.response.commands[0].readValue.length; i++) {
                    csvData[i] = {};
                    csvData[i].localizedString = data.response.commands[0].readValue[i].localizedString;
                    if (data.response.commands[0].readValue[i].message != null) {
                        csvData[i].timeRaised = data.response.commands[0].readValue[i].message.timeRaised || "";
                        csvData[i].timeConfirmed = data.response.commands[0].readValue[i].message.timeConfirmed || "";
                        csvData[i].timeCleared = data.response.commands[0].readValue[i].message.timeCleared || "";
                    }
                    if (data.response.commands[0].readValue[i].alarm != null) {
                        csvData[i].timeRaised = data.response.commands[0].readValue[i].alarm.timeRaised || "";
                        csvData[i].timeConfirmed = data.response.commands[0].readValue[i].alarm.timeConfirmed || "";
                        csvData[i].timeCleared = data.response.commands[0].readValue[i].alarm.timeCleared || "";
                    }
                }

                downloadCSV({ filename: String(Date.now() + " export.csv") }, csvData);

                if (data.error !== TcHmi.Errors.NONE) {
                    // Handle TcHmi.Server class level error here.
                    return;
                }

                var response = data.response;
                if (response.error !== undefined) {
                    // Handle TwinCAT HMI Server response level error here.
                    return;
                }

                var commands = response.commands;
                if (commands === undefined) {
                    return;
                }

                for (var i = 0, ii = commands.length; i < ii; i++) {
                    var command = response.commands[i];
                    if (command === undefined) {
                        return;
                    }
                    if (command.error !== undefined) {
                        // Handle TwinCAT HMI Server command level error here.
                        return;
                    }

                    // Handle result...
                    TcHmi.Log.debug(command.symbol + '=' + command.readValue);
                }

                TcHmi.Server.unsubscribeEx(
                    SubscriptionID,
                    { timeout: 2000 },
                    function (data) {
                        if (data.error !== TcHmi.Errors.NONE) {
                            // Handle TcHmi.Server class level error here.
                            return;
                        }
                        var response = data.response;
                        if (response.error !== undefined) {
                            // Handle TwinCAT HMI Server response level error here.
                            return;
                        }

                        var commands = response.commands;
                        if (commands === undefined) {
                            return;
                        }

                        var command = response.commands[0];
                        if (command === undefined) {
                            return;
                        }

                        if (command.error !== undefined) {
                            TcHmi.Log.debug('Unsubscribe for subscription with request id=' + SubscriptionID + ' failed.');
                        } else {
                            TcHmi.Log.debug('Unsubscribe for subscription with request id=' + SubscriptionID + ' finished.');
                        }
                    });

            });


        }
    };
    
    TcHmi.Functions.registerFunction('GetLoggedSystemEvents', GetLoggedSystemEvents);
})(TcHmi);

convertArrayOfObjectsToCSV = function (args) {
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
downloadCSV = function (args, dataArray) {
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