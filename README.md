# FrontEnd pentru Căutarea Zborurilor

Acest proiect este o aplicație Angular, Spring Boot pentru căutarea zborurilor în funcție de o dată specifică. Utilizatorul poate sorta zborurile după timp, dată și preț, și le poate filtra în funcție de numărul de escale. De asemenea, utilizatorul poate selecta atât zboruri dus, cât și zboruri dus-întors. Aplicația se conectează la un back-end REST API creat cu Spring Boot pentru autentificare și înregistrare, folosind o bază de date PostgreSQL rulând într-un container Docker.

Am utilizat un API extern pentru a prelua datele despre zboruri.

## Tehnologii utilizate

Angular - pentru partea de front-end.

Spring Boot - pentru partea de back-end (REST API).

API extern - pentru preluarea datelor despre zboruri.

PostgreSQL - baza de date utilizată, rulată într-un container Docker.

JWT (JSON Web Tokens) - pentru autentificare și gestionarea sesiunilor de utilizator.

Docker - pentru gestionarea bazei de date PostgreSQL într-un container.

## Pasul 1: Cloneaza proiectul
```bash
git clone https://github.com/utilizator/proiect-angular-zboruri.git
cd proiect-angular-zboruri
```

## Pasul 2: instalare npm
```bash
npm install
```

## Pasul 3: Configurare back-end
Docker Setup pentru PostgreSQL: Creează un container Docker pentru PostgreSQL folosind următoarea comandă:

```
docker run --name Utilizatori -e POSTGRES_PASSWORD=admin -e POSTGRES_DB=Utilizatori -d -p 5432:5432 postgres

```
Configurarea aplicației Spring Boot:

Link pentru backend: https://github.com/adrian4322/SiteZboruriBackEnd

Asigură-te că API-ul REST creat cu Spring Boot este configurat pentru a comunica cu containerul PostgreSQL.
Pornește aplicația Spring Boot. Aceasta va fi disponibilă pe un port configurat http://localhost:8080.

## Pasul 4: porneste site-ul

```bash
ng serve
```
