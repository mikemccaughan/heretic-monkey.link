const storage = require('azure-storage');
const connectionString = "DefaultEndpointsProtocol=https;AccountName=heretic-table;AccountKey=W7Q0nP6Xug5gtDak5qqIb1nzqI6Kye3VYNQ6Ky7SI3XzAlKZBL4G72WBO9LmaDQZoMVZDjvA6f965yri3DwfKQ==;TableEndpoint=https://heretic-table.table.cosmos.azure.com:443/;";
const storageClient = storage.createTableService(connectionString);
const restConnector = require('loopback-connector')