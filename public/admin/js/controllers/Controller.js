/**
 * Created by Feek on 3/16/16.
 */
define([
	'marionette',
	'shared/admin-retailer/js/views/LoginView',
	'views/HeaderView',
	'views/HomeRootView',
	'views/StatView',
	'views/ReadyOrdersView',
	'views/OrdersOutForDeliveryView',
	'views/AllOrdersView',
	'views/factory/FactoryView',
	'App'
], function (
	Marionette,
	LoginView,
	HeaderView,
	HomeRootView,
	StatView,
	ReadyOrdersView,
	OrdersOutForDeliveryView,
	AllOrdersView,
	FactoryView,
	app
) {
	var Controller = Marionette.Object.extend({
		initialize: function(options) {
			this.rootView = options.rootView;
		},

		showLogin: function() {
			this.rootView.getRegion('main').show(new LoginView({
				model: app.user,
				loginSuccessCallback: function(response) {
					if (app.user.isAdmin()) {
						app.router.navigate('admin/dashboard', {trigger: true});
					} else {
						alert('it seems as if you are not an admin. If this is incorrect, please let someone know.');
					}
				}
			}));
		},

		_showDashboard: function() {
			if (this.authorize()) {
				this.rootView.getRegion('header').show(this._getHeaderView());
				this.rootView.getRegion('main').show(this._getHomeView());
			}
		},

		// this class needs to be refactored so badly



		showStatView: function() {
			this._showDashboard();
			this._getHomeView().getRegion('main').show(new StatView());
			this._getSidebarView().trigger('showing', 'stat');
		},

		showOrdersOutForDelivery: function() {
			this._showDashboard();
			this._getHomeView().getRegion('main').show(new OrdersOutForDeliveryView());
			this._getSidebarView().trigger('showing', 'out');
		},

		showReadyOrders: function() {
			this._showDashboard();
			this._getHomeView().getRegion('main').show(new ReadyOrdersView());
			this._getSidebarView().trigger('showing', 'ready');
		},

		showAllOrders: function() {
			this._showDashboard();
			this._getHomeView().getRegion('main').show(new AllOrdersView());
			this._getSidebarView().trigger('showing', 'all');
		},

		showFactory: function() {
			this._showDashboard();
			this._getHomeView().getRegion('main').show(new FactoryView());
			this._getSidebarView().trigger('showing', 'factory');
		},

		/**
		 * If the user is not logged in, redirect to login
		 * @return boolean whether or not authorized
		 */
		authorize: function() {
			if (!app.session.get('token')) {
				app.router.navigate('admin/login', {trigger: true});
				return false;
			}
			return true;
		},

		_getHomeView: function() {
			if (!this.home) {
				this.home = new HomeRootView();
			}
			return this.home;
		},

		_getSidebarView: function() {
			if (!this.sidebarView) {
				this.sidebarView = this._getHomeView().getRegion('sidebar').currentView;
			}

			return this.sidebarView;
		},

		_getHeaderView: function() {
			if (!this.headerView) {
				this.headerView = new HeaderView();
			}
			return this.headerView;
		},
	});

	return Controller;
});
