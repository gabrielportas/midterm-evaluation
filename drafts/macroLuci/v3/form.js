'use strict';
'require view';
'require form';

return view.extend({
    render: function() {
        var m, s, o;

        m = new form.Map('openwrt', _('OpenWrt Configuration Wizard'), _('Configure your OpenWrt device.'));

        // Step 1: Security
        s = m.section(form.TypedSection, 'security', _('Step 1: Security'));
        s.anonymous = true;

        o = s.option(form.Value, 'admin_password', _('New Admin Password'), _('Enter a new password for the admin account.'));
        o.password = true;
        o.rmempty = false;
        o.validate = function(section_id, value) {
            if (value.length < 8) {
                return _('Password must be at least 8 characters long.');
            }
            return true;
        };

        o = s.option(form.Value, 'confirm_admin_password', _('Confirm New Admin Password'), _('Re-enter the new password for confirmation.'));
        o.password = true;
        o.rmempty = false;
        o.validate = function(section_id, value) {
            var pwd = this.section.children.filter(function(opt) {
                return opt.option === 'admin_password';
            })[0].formvalue(section_id);

            if (value !== pwd) {
                return _('Passwords do not match.');
            }
            return true;
        };

        // Step 2: Internet
        s = m.section(form.TypedSection, 'internet', _('Step 2: Internet'));
        s.anonymous = true;

        o = s.option(form.ListValue, 'connection_type', _('Connection Type'), _('Select the type of internet connection.'));
        o.value('dhcp', 'DHCP');
        o.value('static', 'Static IP');
        o.value('pppoe', 'PPPoE');
        o.rmempty = false;

        o = s.option(form.Value, 'static_ip', _('Static IP Address'), _('Enter the static IP address.'));
        o.depends('connection_type', 'static');
        o.rmempty = false;
        o.validate = function(section_id, value) {
            var ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (!ipPattern.test(value)) {
                return _('Invalid IP address.');
            }
            return true;
        };

        o = s.option(form.Value, 'subnet_mask', _('Subnet Mask'), _('Enter the subnet mask.'));
        o.depends('connection_type', 'static');
        o.rmempty = false;
        o.validate = function(section_id, value) {
            var maskPattern = /^(255|254|252|248|240|224|192|128|0)\.0\.0\.0|^(255|254|252|248|240|224|192)\.(255|254|252|248|240|224|192|128|0)\.0\.0|^(255|254|252|248|240|224|192)\.(255|254|252|248|240|224|192|128)\.(255|254|252|248|240|224|192|128|0)\.0|^(255|254|252|248|240|224|192)\.(255|254|252|248|240|224|192|128)\.(255|254|252|248|240|224|192|128)\.(255|254|252|248|240|224|192|128|0)$/;
            if (!maskPattern.test(value)) {
                return _('Invalid subnet mask.');
            }
            return true;
        };

        o = s.option(form.Value, 'gateway', _('Gateway'), _('Enter the gateway.'));
        o.depends('connection_type', 'static');
        o.rmempty = false;
        o.validate = function(section_id, value) {
            var ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (!ipPattern.test(value)) {
                return _('Invalid gateway address.');
            }
            return true;
        };

        o = s.option(form.Value, 'dns_servers', _('DNS Servers'), _('Enter the DNS servers.'));
        o.depends('connection_type', 'static');
        o.rmempty = false;
        o.validate = function(section_id, value) {
            var ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            var dnsList = value.split(',');
            for (var i = 0; i < dnsList.length; i++) {
                if (!ipPattern.test(dnsList[i].trim())) {
                    return _('Invalid DNS server address: ') + dnsList[i];
                }
            }
            return true;
        };

        o = s.option(form.Value, 'pppoe_username', _('PPPoE Username'), _('Enter the PPPoE username.'));
        o.depends('connection_type', 'pppoe');
        o.rmempty = false;

        o = s.option(form.Value, 'pppoe_password', _('PPPoE Password'), _('Enter the PPPoE password.'));
        o.depends('connection_type', 'pppoe');
        o.password = true;
        o.rmempty = false;

        // Step 3: Wireless
        s = m.section(form.TypedSection, 'wireless', _('Step 3: Wireless'));
        s.anonymous = true;

        o = s.option(form.Value, 'wifi_ssid', _('WiFi Network Name (SSID)'), _('Enter the name of your WiFi network.'));
        o.rmempty = false;

        o = s.option(form.Value, 'wifi_password', _('WiFi Password'), _('Enter the WiFi password.'));
        o.password = true;
        o.rmempty = false;
        o.validate = function(section_id, value) {
            if (value.length < 8) {
                return _('WiFi password must be at least 8 characters long.');
            }
            return true;
        };

        // Step 4: Additional Services
        s = m.section(form.TypedSection, 'additional_services', _('Step 4: Additional Services'));
        s.anonymous = true;

        o = s.option(form.Flag, 'enable_vpn', _('Enable VPN'), _('Enable or disable the VPN server.'));
        o.rmempty = false;

        o = s.option(form.Flag, 'enable_dhcp', _('Enable DHCP'), _('Enable or disable the DHCP server.'));
        o.rmempty = false;

        o = s.option(form.Value, 'dhcp_start_range', _('DHCP Start Range'), _('Enter the start range for DHCP IP addresses.'));
        o.depends('enable_dhcp', '1');
        o.rmempty = false;
        o.validate = function(section_id, value) {
            var ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (!ipPattern.test(value)) {
                return _('Invalid DHCP start range.');
            }
            return true;
        };

        o = s.option(form.Value, 'dhcp_end_range', _('DHCP End Range'), _('Enter the end range for DHCP IP addresses.'));
        o.depends('enable_dhcp', '1');
        o.rmempty = false;
        o.validate = function(section_id, value) {
            var ipPattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
            if (!ipPattern.test(value)) {
                return _('Invalid DHCP end range.');
            }
            return true;
        };

        return m.render();
    }
});
