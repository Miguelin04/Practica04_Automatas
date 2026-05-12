# Proyecto APE 04 - Autómatas

Este proyecto implementa los validadores de autómatas para los ejercicios 6, 7 y 8.

## Estructura
- **Documento Word**: `Tablas_Transicion_APE04.docx` (Contiene las tablas de transición de los AFND y AFD, generado por un script de Python).
- **Backend**: Java con Spring Boot (expone los endpoints REST para validar secuencias).
- **Frontend**: HTML, CSS y JS puro ubicado en `src/main/resources/static`. Todo en un diseño moderno ("Glassmorphism").

## Cómo ejecutar

Ya que este es un proyecto estándar de **Spring Boot**, la forma más fácil de ejecutarlo es abriendo la carpeta `Practica 04` en un entorno de desarrollo integrado (IDE) como:
- **IntelliJ IDEA**
- **Eclipse / Spring Tool Suite**
- **Visual Studio Code** (con la extensión "Extension Pack for Java")

### Pasos:
1. Abre la carpeta `Practica 04` en tu IDE.
2. Espera a que el IDE reconozca el archivo `pom.xml` y descargue las dependencias de Maven automáticamente.
3. Busca la clase principal: `src/main/java/com/ape04/automata/AutomataApplication.java`.
4. Haz clic derecho sobre la clase y selecciona **Run 'AutomataApplication.main()'**.
5. Una vez que la consola indique que la aplicación se ha iniciado (usualmente en el puerto 8080), abre tu navegador web.
6. Ingresa a: [http://localhost:8080](http://localhost:8080)

¡Ahí podrás ver la interfaz interactiva para probar los patrones de los 3 ejercicios!
