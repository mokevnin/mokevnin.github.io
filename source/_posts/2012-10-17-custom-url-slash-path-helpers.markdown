---
layout: post
title: "custom url/path helpers"
date: 2012-10-17 14:00
comments: true
categories: routing 
---

В проектах иногда встречаются ссылки, которые строятся без url helpers или
содержат логику. Часто по этому поводу либо не заморачиваются, либо пишут обертки где придется и как придется.

А можно поступить так:

{% codeblock lib/custom_url_helpers.rb %}

module CustomUrlHelpers
  def register_with_facebook_cpath
    Gateway::Facebook.url_for_callback(register_user_facebook_url)
  end

  def create_link_to_facebook_cpath
    Gateway::Facebook.url_for_callback(create_link_account_facebook_url)
  end

  def edit_company_account_curl(account)
    case account
      when ::Company::CrmAccount
        edit_company_crm_account_url(account)
      when ::Company::GisAccount
        edit_company_gis_account_url(account)
    end
  end

  def facebook_auth_cpath
    '/auth/facebook'
  end
end

{% endcodeblock %}

<!-- more -->

Эти методы оканчиваются на cpath и curl, что означает custom path и custom url соответственно.

Подключение к проекту:

{% codeblock app/helpers/web/application_helper.rb %}

module ApplicationHelper
  include CustomUrlHelpers
end

{% endcodeblock %}
