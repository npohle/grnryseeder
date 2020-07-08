import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
import FakeRest from 'fakerest';
import { DataProvider } from 'ra-core';
import faker from 'faker';

export default class memoryDataProvider {

    restServer = {};
    data = {};

    constructor(data) {
        this.restServer = new FakeRest.Server();
        this.restServer.init(data);
    }

    getResponse(type, resource, params) {
        switch (type) {
            case 'getList': {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    sort: [field, order],
                    range: [(page - 1) * perPage, page * perPage - 1],
                    filter: params.filter,
                };
                return {
                    data: this.restServer.getAll(resource, query),
                    total: this.restServer.getCount(resource, {
                        filter: params.filter,
                    }),
                };
            }
            case 'getOne':
                return {
                    data: this.restServer.getOne(resource, params.id, { ...params }),
                };
            case 'getMany':
                return {
                    data: this.restServer.getAll(resource, {
                        filter: { id: params.ids },
                    }),
                };
            case 'getManyReference': {
                const { page, perPage } = params.pagination;
                const { field, order } = params.sort;
                const query = {
                    sort: [field, order],
                    range: [(page - 1) * perPage, page * perPage - 1],
                    filter: { ...params.filter, [params.target]: params.id },
                };
                return {
                    data: this.restServer.getAll(resource, query),
                    total: this.restServer.getCount(resource, {
                        filter: query.filter,
                    }),
                };
            }
            case 'update':
                return {
                    data: this.restServer.updateOne(resource, params.id, {
                        ...params.data,
                    }),
                };
            case 'updateMany':
                params.ids.forEach(id =>
                    this.restServer.updateOne(resource, id, {
                        ...params.data,
                    })
                );
                return { data: params.ids };
            case 'create':
                return {
                    data: this.restServer.addOne(resource, { ...params.data, "id": faker.random.uuid(), "generated_at": Date.now(), "name": faker.name.findName(), "username": faker.internet.userName(), "email": faker.internet.email() }),
                };
            case 'delete':
                return { data: this.restServer.removeOne(resource, params.id) };
            case 'deleteMany':
                params.ids.forEach(id => this.restServer.removeOne(resource, id));
                return { data: params.ids };
            default:
                return false;
        }
    }

        /**
     * @param {String} type One of the data Provider methods, e.g. 'getList'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Promise} The response
     */
    handle(type, resource, params) {
        const collection = this.restServer.getCollection(resource);
        if (!collection) {
            return Promise.reject(
                new Error(`Undefined collection "${resource}"`)
            );
        }
        let response;
        try {
            response = this.getResponse(type, resource, params);
        } catch (error) {
            console.error(error);
            return Promise.reject(error);
        }
        //if (loggingEnabled) {
        //    log(type, resource, params, response);
        //}
        return Promise.resolve(response);
    }

    getList(resource, params) {return this.handle('getList', resource, params)}
    getOne(resource, params) {return this.handle('getOne', resource, params)}
    getMany(resource, params) {return this.handle('getMany', resource, params)}
    getManyReference(resource, params) {return this.handle('getManyReference', resource, params)}
    update(resource, params) {return this.handle('update', resource, params)}
    updateMany(resource, params) {return this.handle('updateMany', resource, params)}
    create(resource, params) {return this.handle('create', resource, params)}
    delete(resource, params) {return this.handle('delete', resource, params)}
    deleteMany(resource, params) {return this.handle('deleteMany', resource, params)}

};