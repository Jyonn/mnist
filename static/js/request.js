class Method {
    static staticConstructor() {
        this.GET = 'get';
        this.POST = 'post';
        this.PUT = 'put';
        this.DELETE = 'delete';
        this.PATCH = 'patch';
    }
}

class Request {
    static getQueryString(params) {
      const esc = encodeURIComponent;
      return Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    }
    static async baseFetch(method, url, data=null) {
        if ((method === Method.GET || method === Method.DELETE) && data) {
            url += '?' + this.getQueryString(data);
            data = null;
        }
        let req = await fetch(url, {
            method: method,
            headers: {
                "Content-type": "application/json",
                // "Token": this.token || '',
            },
            body: data ? JSON.stringify(data) : null,
            credentials: "include",
        });
        return req.json();
    }
    static async get(url, data=null) {
        return this.baseFetch(Method.GET, url, data);
    }
    static async post(url, data=null) {
        return this.baseFetch(Method.POST, url, data);
    }
    static async put(url, data=null) {
        return this.baseFetch(Method.PUT, url, data);
    }
    static async delete(url, data=null) {
        return this.baseFetch(Method.DELETE, url, data);
    }
}

Method.staticConstructor();
