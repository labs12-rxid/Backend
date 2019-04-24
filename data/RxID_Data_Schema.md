# RxID Data Schema

## Tables

- [users](#usersTABLE)
- [meds](#medsTABLE)
- [diaries](#diariesTABLE)
- [reminders](#remindersTABLE)

## users <a name="usersTABLE"></a>

| Field      | Data Type | Notes                                        |
| ---------- | --------- | -------------------------------------------- |
| id         | integer   | required, PK, auto-increment                 |
| username   | string    | required, unique, 64 chars                   |
| password   | string    | required, 64 chars                           |
| created_at | date      | required, auto-generated                     |
| premium    | boolean   | required, default false (access to full app) |
| email      | string    | optional, 64 chars                           |
| phone      | string    | optional, 64 chars (used for all reminders)  |
| first_name | string    | optional, 64 chars                           |
| last_name  | string    | optional, 64 chars                           |

## meds <a name="medsTABLE"></a>

| Field              | Data Type | Notes                                                           |
| ------------------ | --------- | --------------------------------------------------------------- |
| id                 | integer   | required, PK, auto-increment                                    |
| user_id            | integer   | required, FK of users PK, onDelete: cascade, onUpdate: cascade  |
| med_name           | string    | required, 64 chars, source: user-entered or DS backend          |
| med_active         | boolean   | required, default true (med currently taken)                    |
| med_rx             | string    | optional, 64 chars (med Rx#)                                    |
| med_pharm_phone    | string    | optional, 64 chars                                              |
| med_type           | string    | optional, 64 chars (tablet, cream, etc.)                        |
| med_size           | integer   | optional, 64 chars (size of each pill)                          |
| med_size_unit      | string    | optional, 64 chars (mg, etc.)                                   |
| med_dose           | integer   | optional, 64 chars (prescribed dose per admin)                  |
| med_dose_unit      | string    | optional, 64 chars (mg, tablet, etc.)                           |
| med_dose_freq      | integer   | optional, 64 chars (# times per \_\_\_)                         |
| med_dose_freq_unit | string    | optional, 64 chars (day, week, etc.)                            |
| med_dir_1          | string    | optional, 64 chars (take with food, etc.)                       |
| med_dir_2          | string    | optional, 64 chars                                              |
| med_dir_3          | string    | optional, 64 chars                                              |
| med_dir_4          | string    | optional, 64 chars                                              |
| med_dir_5          | string    | optional, 64 chars                                              |
| med_admin_time_1   | time      | optional, (time of admin) (RESEARCH NEEDED)                     |
| med_diary_active   | boolean   | optional, default false (user flag for diaries)                 |
| med_diary_time_1   | time      | optional, (time of diary reminder) (RESEARCH NEEDED)            |
| med_ingr           | string    | optional, comma-delimited, source: DS backend (RESEARCH NEEDED) |
| med_side_eff       | string    | optional, comma-delimited, source: DS backend (RESEARCH NEEDED) |
| med_notes          | string    | optional, 1024 chars (general user notes)                       |

## diaries <a name="diariesTABLE"></a>

| Field       | Data Type | Notes                                                               |
| ----------- | --------- | ------------------------------------------------------------------- |
| id          | integer   | required, PK, auto-increment                                        |
| user_id     | integer   | required, FK of users PK, onDelete: cascade, onUpdate: cascade      |
| med_id      | integer   | required, FK of meds PK, onDelete: cascade, onUpdate: cascade       |
| diary_date  | date      | optional, default auto-generated, user-adjustable (RESEARCH NEEDED) |
| diary_emoji | string    | optional/required: 1/2 (code for emoji) (RESEARCH NEEDED)           |
| diary_text  | string    | optional/required: 2/2, 1024 chars                                  |

## rems <a name="remsTABLE"></a>

| Field     | Data Type | Notes                                                          |
| --------- | --------- | -------------------------------------------------------------- |
| id        | integer   | required, PK, auto-increment                                   |
| user_id   | integer   | required, FK of users PK, onDelete: cascade, onUpdate: cascade |
| med_id    | integer   | required, FK of meds PK, onDelete: cascade, onUpdate: cascade  |
| rem_type  | string    | required, ('admin' or 'diary')                                 |
| rem_notes | string    | optional, 16 chars (user notes to appear in reminder)          |
| rem\_...  | date      | (RESEARCH NEEDED)                                              |
