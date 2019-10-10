// Keep this lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.d.ts" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Controls\System\TcHmiControl\Source.d.ts" />

// Keep this lines for a best effort IntelliSense of Visual Studio 2013/2015.
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\Lib\jquery\jquery.js" />
/// <reference path="C:\TwinCAT\Functions\TE2000-HMI-Engineering\Infrastructure\TcHmiFramework\Latest\TcHmi.js" />

(function (TcHmi) {

    var RequestHistorizedDataOfSymbol = function (SymbolName,StartTime,EndTime) {
        if (SymbolName == null) {
            return;
        }
        if (TcHmi.Server.isWebsocketReady()) {
            var commands = [
	            {
	                "commandOptions": [
			            "SendErrorMessage"
	                ],
	                "symbol": "TcHmiSqliteHistorize.GetTrendLineData",
	                "writeValue": {
	                    "chartName": "TcHmiTrendLineChart",
	                    "xAxisStart": StartTime,
	                    "xAxisEnd": EndTime,
	                    "yAxes": [
				            {
				                "symbol": SymbolName
				            }
	                    ],
	                    "displayWidth": 10000
	                }
	            },
	            {
	                "commandOptions": [
			            "SendErrorMessage"
	                ],
	                "symbol": "TcHmiSqliteHistorize.GetTrendLineWindow",
	                "writeValue": {
	                    "chartName": "TcHmiTrendLineChart",
	                    "xAxisStart": StartTime,
	                    "xAxisEnd": EndTime,
	                    "yAxes": [
				            {
				                "symbol": SymbolName
				            }
	                    ]
	                }
	            }
            ];

            var SubscriptionID = TcHmi.Server.subscribe(commands, 2000, function (data) {
                console.log(data.response.commands[0].readValue.axesData[0]);

                TcHmiExampleCollection.Utilities.CSV.downloadCSV({ filename: String(Date.now() + " export.csv") }, data.response.commands[0].readValue.axesData[0]);

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
    
    TcHmi.Functions.registerFunction('RequestHistorizedDataOfSymbol', RequestHistorizedDataOfSymbol);
})(TcHmi);