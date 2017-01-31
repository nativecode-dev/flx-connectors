'use strict';

(function () {

    'use strict';

    var couchpotato = require('couchpotato-api');

    var apimap = function apimap(api) {
        return {
            call: function call(method) {
                for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    args[_key - 1] = arguments[_key];
                }

                return api[method].apply(api, args);
            },
            app: {
                available: function available() {
                    return api.get('app.available');
                },
                restart: function restart() {
                    return api.get('app.restart');
                },
                shutdown: function shutdown() {
                    return api.get('app.shutdown');
                },
                version: function version() {
                    return api.get('app.version');
                }
            },
            category: {
                list: function list() {
                    return api.get('category.list');
                }
            },
            directory: {
                list: function list(path, hidden) {
                    return api.get('directory.list', {
                        path: path,
                        show_hidden: hidden
                    });
                }
            },
            logging: {
                clear: function clear() {
                    return api.get('logging.clear');
                },
                get: function get(number) {
                    return api.get('logging.get', {
                        nr: number
                    });
                },
                partial: function partial(count, type) {
                    return api.get('logging.partial', {
                        lines: count,
                        type: type || 'all'
                    });
                }
            },
            manage: {
                progress: function progress() {
                    return api.get('manage.progress');
                },
                update: function update(full) {
                    return api.get('manage.update', {
                        full: full || false
                    });
                }
            },
            media: {
                delete: function _delete(ids, type) {
                    return api.get('media.delete', {
                        id: ids,
                        delete_from: type || 'all'
                    });
                },
                get: function get(id) {
                    return api.get('media.get', {
                        id: id
                    });
                },
                list: function list(title, status, release, limit, type, starts) {
                    return api.get('media.list', {
                        limit_offset: limit,
                        release_status: release,
                        search: title,
                        starts_with: starts,
                        status: status,
                        type: type
                    });
                },
                refresh: function refresh() {
                    return api.get('media.refresh');
                }
            },
            movie: {
                add: function add(profileid, title, identifier, categoryid, force) {
                    return api.get('movie.add', {
                        category_id: categoryid,
                        force_readd: force,
                        identifier: identifier,
                        profile_id: profileid,
                        title: title
                    });
                },
                delete: function _delete(ids, type) {
                    return api.get('movie.delete', {
                        id: ids,
                        delete_from: type || 'all'
                    });
                },
                edit: function edit(title, profileid, ids, categoryid) {
                    return api.get('movie.edit', {
                        category_id: categoryid,
                        default_title: title,
                        id: ids,
                        profile_id: profileid
                    });
                },
                list: function list(title, status, release, limit, starts) {
                    return api.get('movie.list', {
                        limit_offset: limit,
                        release_status: release,
                        search: title,
                        starts_with: starts,
                        status: status
                    });
                },
                searcher: {
                    full: function full() {
                        return api.get('movie.searcher.full_search');
                    },
                    next: function next(mediaid) {
                        return api.get('movie.searcher.try_next', {
                            media_id: mediaid
                        });
                    },
                    progress: function progress() {
                        return api.get('movie.searcher.progress');
                    }
                }
            },
            notification: {
                list: function list(limit) {
                    return api.get('notification.list', {
                        limit_offset: limit
                    });
                },
                markread: function markread(ids) {
                    return api.get('notification.markread', {
                        ids: ids
                    });
                }
            },
            profile: {
                list: function list() {
                    return api.get('profile.list');
                }
            },
            quality: {
                list: function list() {
                    return api.get('quality.list');
                }
            },
            release: {
                delete: function _delete(id) {
                    return api.get('release.delete', {
                        id: id
                    });
                },
                download: function download(id) {
                    return api.get('release.manual_download', {
                        id: id
                    });
                },
                ignore: function ignore(id) {
                    return api.get('release.ignore', {
                        id: id
                    });
                }
            },
            renamer: {
                progress: function progress() {
                    return api.get('renamer.progress');
                },
                scan: function scan(files, downloadid, status, folder_base, folder_to, folder_media, async, downloader) {
                    return api.get('renamer.scan', {
                        async: async,
                        base_folder: folder_base,
                        download_id: downloadid,
                        downloader: downloader,
                        files: files,
                        media_folder: folder_media,
                        status: status,
                        to_folder: folder_to
                    });
                }
            },
            search: function search(query, type) {
                return api.get('search', {
                    q: query,
                    type: type
                });
            },
            searcher: {
                full: function full() {
                    return api.get('searcher.full_search');
                },
                progress: function progress() {
                    return api.get('searcher.progress');
                }
            },
            settings: {
                get: function get() {
                    return api.get('settings');
                },
                save: function save(section, name, value) {
                    return api.get('settings.save', {
                        name: name,
                        section: section,
                        value: value
                    });
                }
            },
            updater: {
                check: function check() {
                    return api.get('updater.check');
                },
                info: function info() {
                    return api.get('updater.info');
                }
            }
        };
    };

    module.exports = function (config) {
        var options = {
            apiKey: config.server.apikey,
            hostname: config.server.hostname,
            password: config.server.password,
            post: config.server.port,
            ssl: config.server.ssl,
            urlBase: config.server.urlbase,
            username: config.server.username
        };

        return apimap(new couchpotato(options));
    };
})();