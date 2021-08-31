const ronin     = require( 'ronin-server' )
const mocks     = require( 'ronin-mocks' )
const database  = require( 'ronin-database' )


module.exports = () => {

	const server = ronin.server();

	database.connect( process.env.MONGO_URI );
	server.use( '/', mocks.server( server.Router(), false, false ) );
	server.start();
}