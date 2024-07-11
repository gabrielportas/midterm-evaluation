'use strict';
'require uci';
'require view';

return view.extend({
    handleSaveApply: null,
    handleSave: null,
    handleReset: null,
    load: function () {
        return Promise.all([
            uci.load('openwrt')
        ]);
    },
    render: function (data) {
        var sections = uci.sections('openwrt');
        var summaryList = E('ul', { id: 'summaryList' });

        summaryList.appendChild(E('li', {}, ['Language: ', sections[0].language]));
        summaryList.appendChild(E('li', {}, ['Admin Password: ', '******']));
        summaryList.appendChild(E('li', {}, ['Connection Type: ', sections[1].connection_type]));
        
        if (sections[1].connection_type === 'static') {
            summaryList.appendChild(E('li', {}, ['Static IP: ', sections[1].static_ip]));
            summaryList.appendChild(E('li', {}, ['Subnet Mask: ', sections[1].subnet_mask]));
            summaryList.appendChild(E('li', {}, ['Gateway: ', sections[1].gateway]));
            summaryList.appendChild(E('li', {}, ['DNS Servers: ', sections[1].dns_servers]));
        } else if (sections[1].connection_type === 'pppoe') {
            summaryList.appendChild(E('li', {}, ['PPPoE Username: ', sections[1].pppoe_username]));
            summaryList.appendChild(E('li', {}, ['PPPoE Password: ', '******']));
        }

        summaryList.appendChild(E('li', {}, ['WiFi SSID: ', sections[2].wifi_ssid]));
        summaryList.appendChild(E('li', {}, ['WiFi Password: ', '******']));
        summaryList.appendChild(E('li', {}, ['Enable VPN: ', sections[3].enable_vpn ? 'Yes' : 'No']));
        summaryList.appendChild(E('li', {}, ['Enable DHCP: ', sections[3].enable_dhcp ? 'Yes' : 'No']));

        if (sections[3].enable_dhcp) {
            summaryList.appendChild(E('li', {}, ['DHCP Start Range: ', sections[3].dhcp_start_range]));
            summaryList.appendChild(E('li', {}, ['DHCP End Range: ', sections[3].dhcp_end_range]));
        }

        return E([
            E('h2', _('Configuration Summary')),
            summaryList
        ]);
    }
});
