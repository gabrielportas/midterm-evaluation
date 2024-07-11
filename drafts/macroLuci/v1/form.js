'use strict';
'require view';
'require form';

return view.extend({
    render: function() {
        var m, s, o;

        m = new form.Map('openwrt', _('OpenWrt Configuration Wizard'), _('Configure your OpenWrt device.'));

        s = m.section(form.TypedSection, 'language', _('Step 1: Choose Language'));
        s.anonymous = true;

        o = s.option(form.ListValue, 'language', _('Language'), _('Select the language for the interface.'));
        o.value('es', 'Español');
        o.value('en', 'Inglés');
        o.value('de', 'Alemán');
        o.rmempty = false;

        s = m.section(form.TypedSection, 'security', _('Step 2: Security'));
        s.anonymous = true;

        o = s.option(form.Value, 'admin_password', _('New Admin Password'), _('Enter a new password for the admin account.'));
        o.password = true;
        o.rmempty = false;

        o = s.option(form.Value, 'confirm_admin_password', _('Confirm New Admin Password'), _('Re-enter the new password for confirmation.'));
        o.password = true;
        o.rmempty = false;

        s = m.section(form.TypedSection, 'internet', _('Step 3: Internet'));
        s.anonymous = true;

        o = s.option(form.ListValue, 'connection_type', _('Connection Type'), _('Select the type of internet connection.'));
        o.value('dhcp', 'DHCP');
        o.value('static', 'Static IP');
        o.value('pppoe', 'PPPoE');
        o.rmempty = false;

        o = s.option(form.Value, 'static_ip', _('Static IP Address'), _('Enter the static IP address.'));
        o.depends('connection_type', 'static');
        o.rmempty = false;

        o = s.option(form.Value, 'subnet_mask', _('Subnet Mask'), _('Enter the subnet mask.'));
        o.depends('connection_type', 'static');
        o.rmempty = false;

        o = s.option(form.Value, 'gateway', _('Gateway'), _('Enter the gateway.'));
        o.depends('connection_type', 'static');
        o.rmempty = false;

        o = s.option(form.Value, 'dns_servers', _('DNS Servers'), _('Enter the DNS servers.'));
        o.depends('connection_type', 'static');
        o.rmempty = false;

        o = s.option(form.Value, 'pppoe_username', _('PPPoE Username'), _('Enter the PPPoE username.'));
        o.depends('connection_type', 'pppoe');
        o.rmempty = false;

        o = s.option(form.Value, 'pppoe_password', _('PPPoE Password'), _('Enter the PPPoE password.'));
        o.depends('connection_type', 'pppoe');
        o.password = true;
        o.rmempty = false;
      
        s = m.section(form.TypedSection, 'wireless', _('Step 4: Wireless'));
        s.anonymous = true;

        o = s.option(form.Value, 'wifi_ssid', _('WiFi Network Name (SSID)'), _('Enter the name of your WiFi network.'));
        o.rmempty = false;

        o = s.option(form.Value, 'wifi_password', _('WiFi Password'), _('Enter the WiFi password.'));
        o.password = true;
        o.rmempty = false;

        s = m.section(form.TypedSection, 'additional_services', _('Step 5: Additional Services'));
        s.anonymous = true;

        o = s.option(form.Flag, 'enable_vpn', _('Enable VPN'), _('Enable or disable the VPN server.'));
        o.rmempty = false;

        o = s.option(form.Flag, 'enable_dhcp', _('Enable DHCP'), _('Enable or disable the DHCP server.'));
        o.rmempty = false;

        o = s.option(form.Value, 'dhcp_start_range', _('DHCP Start Range'), _('Enter the start range for DHCP IP addresses.'));
        o.depends('enable_dhcp', '1');
        o.rmempty = false;

        o = s.option(form.Value, 'dhcp_end_range', _('DHCP End Range'), _('Enter the end range for DHCP IP addresses.'));
        o.depends('enable_dhcp', '1');
        o.rmempty = false;

        s = m.section(form.TypedSection, 'summary', _('Step 6: Summary'));
        s.anonymous = true;
        
        return m.render();
    }
});
