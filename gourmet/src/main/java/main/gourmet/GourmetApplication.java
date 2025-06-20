package main.gourmet;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import main.gourmet.Entity.Service.UserService;

@SpringBootApplication
public class GourmetApplication {

	public static void main(String[] args) {
		ConfigurableApplicationContext context = SpringApplication.run(GourmetApplication.class, args);

		// Crear roles si no existen al iniciar la aplicación
		UserService userService = context.getBean(UserService.class);
		userService.createRolesIfNotExist();
	}

}
