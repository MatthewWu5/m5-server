var postAction = ['sendLoadImageFlag']
var getAction = ['getPageData', 'getHot24Data', 'getMoreData', 'getMoreVideoData',
    'getIncrementalData', 'getLiveData', 'getLivePageData', 'getEndingData']

var post = {}, get = {}
for (let item of postAction) {
    post[item] = '/' + item
}
for (let item of getAction) {
    get[item] = '/' + item
}

module.exports = {
    post, get
}