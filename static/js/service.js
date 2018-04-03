class Service {
    static detectHandwritingAPI({image}) {
        return Request.post('/api/detect', arguments[0]);
    }
}