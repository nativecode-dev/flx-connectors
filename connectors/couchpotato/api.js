(function () {

    'use strict'

    const couchpotato = require('couchpotato-api')

    const apimap = (api) => {
        return {
            call: (method, ...args) => {
                return api[method](...args)
            },
            app: {
                available: () => {
                    return api.get('app.available')
                },
                restart: () => {
                    return api.get('app.restart')
                },
                shutdown: () => {
                    return api.get('app.shutdown')
                },
                version: () => {
                    return api.get('app.version')
                }
            },
            category: {
                list: () => {
                    return api.get('category.list')
                }
            },
            directory: {
                list: (path, hidden) => {
                    return api.get('directory.list', {
                        path: path,
                        show_hidden: hidden
                    })
                }
            },
            logging: {
                clear: () => {
                    return api.get('logging.clear')
                },
                get: (number) => {
                    return api.get('logging.get', {
                        nr: number
                    })
                },
                partial: (count, type) => {
                    return api.get('logging.partial', {
                        lines: count,
                        type: type || 'all'
                    })
                }
            },
            manage: {
                progress: () => {
                    return api.get('manage.progress')
                },
                update: (full) => {
                    return api.get('manage.update', {
                        full: full || false
                    })
                }
            },
            media: {
                delete: (ids, type) => {
                    return api.get('media.delete', {
                        id: ids,
                        delete_from: type || 'all'
                    })
                },
                get: (id) => {
                    return api.get('media.get', {
                        id: id
                    })
                },
                list: (title, status, release, limit, type, starts) => {
                    return api.get('media.list', {
                        limit_offset: limit,
                        release_status: release,
                        search: title,
                        starts_with: starts,
                        status: status,
                        type: type
                    })
                },
                refresh: () => {
                    return api.get('media.refresh')
                }
            },
            movie: {
                add: (profileid, title, identifier, categoryid, force) => {
                    return api.get('movie.add', {
                        category_id: categoryid,
                        force_readd: force,
                        identifier: identifier,
                        profile_id: profileid,
                        title: title
                    })
                },
                delete: (ids, type) => {
                    return api.get('movie.delete', {
                        id: ids,
                        delete_from: type || 'all'
                    })
                },
                edit: (title, profileid, ids, categoryid) => {
                    return api.get('movie.edit', {
                        category_id: categoryid,
                        default_title: title,
                        id: ids,
                        profile_id: profileid
                    })
                },
                list: (title, status, release, limit, starts) => {
                    return api.get('movie.list', {
                        limit_offset: limit,
                        release_status: release,
                        search: title,
                        starts_with: starts,
                        status: status
                    })
                },
                searcher: {
                    full: () => {
                        return api.get('movie.searcher.full_search')
                    },
                    next: (mediaid) => {
                        return api.get('movie.searcher.try_next', {
                            media_id: mediaid
                        })
                    },
                    progress: () => {
                        return api.get('movie.searcher.progress')
                    }
                }
            },
            notification: {
                list: (limit) => {
                    return api.get('notification.list', {
                        limit_offset: limit
                    })
                },
                markread: (ids) => {
                    return api.get('notification.markread', {
                        ids: ids
                    })
                }
            },
            profile: {
                list: () => {
                    return api.get('profile.list')
                }
            },
            quality: {
                list: () => {
                    return api.get('quality.list')
                }
            },
            release: {
                delete: (id) => {
                    return api.get('release.delete', {
                        id: id
                    })
                },
                download: (id) => {
                    return api.get('release.manual_download', {
                        id: id
                    })
                },
                ignore: (id) => {
                    return api.get('release.ignore', {
                        id: id
                    })
                }
            },
            renamer: {
                progress: () => {
                    return api.get('renamer.progress')
                },
                scan: (files, downloadid, status, folder_base, folder_to, folder_media, async, downloader) => {
                    return api.get('renamer.scan', {
                        async: async,
                        base_folder: folder_base,
                        download_id: downloadid,
                        downloader: downloader,
                        files: files,
                        media_folder: folder_media,
                        status: status,
                        to_folder: folder_to
                    })
                }
            },
            search: (query, type) => {
                return api.get('search', {
                    q: query,
                    type: type
                })
            },
            searcher: {
                full: () => {
                    return api.get('searcher.full_search')
                },
                progress: () => {
                    return api.get('searcher.progress')
                }
            },
            settings: {
                get: () => {
                    return api.get('settings')
                },
                save: (section, name, value) => {
                    return api.get('settings.save', {
                        name: name,
                        section: section,
                        value: value
                    })
                }
            },
            updater: {
                check: () => {
                    return api.get('updater.check')
                },
                info: () => {
                    return api.get('updater.info')
                }
            }
        }
    }

    module.exports = {
        api: (config) => {
            const options = {
                hostname: config.server.hostname,
                post: config.server.port,
                apiKey: config.server.apikey,
                username: config.server.username,
                password: config.server.password,
                urlBase: config.server.urlbase,
                ssl: config.server.ssl
            }

            return new couchpotato(options)
        }
    }

})()