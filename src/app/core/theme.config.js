function themeConfig($mdThemingProvider) {
    'ngInject';
    $mdThemingProvider
        .theme('default')
        .primaryPalette('teal')
        .accentPalette('indigo')
        .warnPalette('deep-orange')
        .backgroundPalette('blue-grey');
};
export default themeConfig;
