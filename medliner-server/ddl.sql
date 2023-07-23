CREATE TABLE IF NOT EXISTS PATIENT (

    id integer primary key autoincrement,
    name text not null, 
    identifier text, 
    cellphone text not null, 
    smsOption boolean, 
    whatsappOption boolean


);



CREATE TABLE IF NOT EXISTS QUEUE (

    id integer primary key autoincrement,
    name text not null, 
    description text not null, 
    queue_date text not null --change to other style later

);


CREATE TABLE IF NOT EXISTS QUEUE_PATIENT (

    id integer primary key autoincrement,
    queue_id integer not null, 
    patient_id integer not null,
    serviced boolean not null default 0

);