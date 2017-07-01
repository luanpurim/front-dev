function themeConfig($mdThemingProvider) {
    'ngInject';
    $mdThemingProvider
        .theme('default')
        .primaryPalette('teal')
        .accentPalette('indigo')
        .warnPalette('deep-orange');
};
export default themeConfig;
