require ( './dbq.js' )()

module.exports = function() {
    this.dbq = dbq
    this.ping = ping
    this.request = request
}    