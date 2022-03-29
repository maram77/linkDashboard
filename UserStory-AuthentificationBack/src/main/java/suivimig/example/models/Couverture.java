package suivimig.example.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.validation.constraints.Size;

@Entity
public class Couverture {
    @Id
    private long id ;

    @Size(max = 20)
    private String traitement;

    private String nomProc;

    private boolean couvert;




}
