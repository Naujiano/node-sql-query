require ( './dbq.js' )()

module.exports = function() {
    this.dbq = dbq
    this.request = request
    this.ping = ping
}    