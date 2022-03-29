package suivimig.example.models;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
public class PrdSp {
    @Id
    private long id ;

    @Size(max = 20)
    private String name;


    /*--------------------------------------------------*/
    @OneToMany(mappedBy ="prdSp")
    private List<Proc> procs =new ArrayList<Proc>();
}
