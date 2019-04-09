# 2019-04-10 Merritt build/deployment/cleanup tasks (proposed)

1. figure out how we want to install/manage third-party software (Jenkins,
   Maven, OpenJDK, Tomcat, LDAP, ZK...)
2. modernize Jenkins
   - add Jenkinsfiles to all Jenkins-built projects
   - set up dependent builds
     - determine all Jenkins job interdependencies
     - add/update Jenkins job interdependencies
   
