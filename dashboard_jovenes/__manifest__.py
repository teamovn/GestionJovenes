# -*- coding: utf-8 -*-
{
    'name': "Dashboard",
    'version': '13.0.1.0.0',
    'summary': """Dashboard""",
    'description': """Dashboard""",
    'category': '',
    'author': '',
    'company': '',
    'maintainer': '',
    'website': "",
    'depends': ['jovenes'],
    'external_dependencies': {
        'python': ['pandas'],
    },

    'data': [
        'views/dashboard_views.xml'
    ],
    'qweb': ["static/src/xml/pos_dashboard.xml"],
    'images': [],
    'license': "AGPL-3",
    'installable': True,
    'application': False,
}
