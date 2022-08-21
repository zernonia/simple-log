---
title: Supabase Integration
slug: Supabase
icon: "i-logos-supabase-icon"
---

SimpleLog is powered by [Supabase](https://supabase.com), so naturally a plugin is a must 😂!
Just follow these few simple steps to start.

## Create Integration

Navigate to [Plugin](http://localhost:3000/app/settings/plugins) page in the app, and you will be welcomed with Supabase integration immediately.

![SimpleLog plugin page](/assets/docs/supabase/pic1.png)

Then, select the desired project and channels to populate events from Supabase.
After **create** the integration, copy the endpoint.

![Create Supabase integration](/assets/docs/supabase/pic2.png)

---

## Connect with Supabase

Next, login to your [Supabase project](https://app.supabase.com/), and navigate to `Database` → `Database Webhooks`.

![Supabase Database](/assets/docs/supabase/pic3.png)

Create a new database webhook with the table you want to log the events with. You can select any `Events` you wish to trigger. In this example below, I've selected `users` table, and only log the `Insert` event in SimpleLog.

![Create Supabase Database Webhooks](/assets/docs/supabase/pic4.png)

Lastly, change the Method to `POST`, and paste in the URL field with the endpoint you copied just now.
You can also add `notify` parameter to `true/false`. (default to `true`).

![Create Supabase integration](/assets/docs/supabase/pic5.png)

## 🎉 !

Awesome! You've create an integration with Supabase, and it will notify you when there's a change in Supabase table!
