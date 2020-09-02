# -*- coding: utf-8 -*-

import pytz
from odoo import models, fields, api
from datetime import timedelta, datetime, date


class YoungDashboard(models.Model):
    _inherit = 'young.curriculum.vitae'


    @api.model
    def total_young(self):
        #import ipdb; ipdb.set_trace()

        query = '''select count(*) from young_curriculum_vitae'''
        cr = self._cr
        cr.execute(query)
        count_young = cr.fetchall()
        total_young = count_young[0][0]

        cr.execute(""" select count(*) from young_curriculum_vitae where id in (select cv_id from young_insertion) """)
        job_obt = cr.fetchall()
        total_job = job_obt[0][0]

        cr = self._cr
        query_cat_list = '''select count(*)from young_curriculum_vitae where cat_list in ('A','B','C','D','E','F')'''
        cr.execute(query_cat_list)
        cat_list = cr.fetchall()

        query_e = """select count(*)from young_curriculum_vitae where cat_list = 'E' """
        cr.execute(query_e)
        e = cr.fetchall()

        query_g = """select count(*)from young_curriculum_vitae where cat_list = 'G' """
        cr.execute(query_g)
        g = cr.fetchall()

        query_a = """select count(*)from young_curriculum_vitae where cat_list = 'A' """
        cr.execute(query_a)
        a = cr.fetchall()

        query_b = """select count(*)from young_curriculum_vitae where cat_list = 'B' """
        cr.execute(query_b)
        b = cr.fetchall()

        query_c = """select count(*)from young_curriculum_vitae where cat_list = 'C' """
        cr.execute(query_c)
        c = cr.fetchall()

        query_d = """select count(*)from young_curriculum_vitae where cat_list = 'D' """
        cr.execute(query_d)
        d = cr.fetchall()

        query_f = """select count(*)from young_curriculum_vitae where cat_list = 'F' """
        cr.execute(query_f)
        f = cr.fetchall()


        return {'total_young': total_young,
                'total_job': total_job,
                'job_category':cat_list[0][0],
                'back_study':e[0][0],
                'entrepreneurship':g[0][0],
                'category_a': a[0][0],
                'category_b': b[0][0],
                'category_c': c[0][0],
                'category_d': d[0][0],
                'category_f': f[0][0] }

    @api.model
    def get_categories(self):
        cr = self._cr
        query_a = """select count(*)from young_curriculum_vitae where cat_list = 'A' """
        cr.execute(query_a)
        a = cr.fetchall()

        query_b = """select count(*)from young_curriculum_vitae where cat_list = 'B' """
        cr.execute(query_b)
        b = cr.fetchall()

        query_c = """select count(*)from young_curriculum_vitae where cat_list = 'C' """
        cr.execute(query_c)
        c = cr.fetchall()

        query_d = """select count(*)from young_curriculum_vitae where cat_list = 'D' """
        cr.execute(query_d)
        d = cr.fetchall()

        query_g = """select count(*)from young_curriculum_vitae where cat_list = 'G' """
        cr.execute(query_g)
        f = cr.fetchall()

        category = ['category_a','category_b','category_c','category_d',\
                    'category_g']

        total = [a[0][0],b[0][0],c[0][0],d[0][0],f[0][0]]

        final = [total, category]
        return final

    @api.model
    def unemployed(self):
        cr = self._cr
        cr.execute(""" select count(*) from young_curriculum_vitae where id not in (select cv_id from young_insertion) """)
        unemp = cr.fetchall()


        return {
             'total_sale': unemp[0][0],
             'total_order_count': 0,
             'total_refund_count': 0,
             'total_session': 0,
             'today_refund_total': 0,
             'today_sale': 0,}

    @api.model
    def job_placement(self, ):
        cr = self._cr
        query = """select count(*)from young_curriculum_vitae where cat_list in ('A','B','C','D','E','F')"""
        cr.execute(query)
        placement = cr.fetchall()

        return {'total_placement':placement[0][0]}
