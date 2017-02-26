import $ from 'jquery';

const
    headerHeight = 94,
    footerHeight = 40;

function getHeaderHeight () {
    return headerHeight;
}

function getFooterHeight () {
    return footerHeight;
}

function getGraphHeight () {
    return (
        $(window).height() -
        getHeaderHeight() -
        getFooterHeight() -
        30
    );
}

function  getGraphWidth () {
    return $('body').width() - 30;
}
export {
    getHeaderHeight,
    getFooterHeight,
    getGraphHeight,
    getGraphWidth
};
