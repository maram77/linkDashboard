package suivimig.example.models;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table
public class Product{
    @Id
    private Long id_prod;

    @Column(name = "name")
    private String name;

    /*-----------------------------------------------------------*/
    @OneToMany(targetEntity=Proc.class, mappedBy ="product")
    private List<Proc> procedures= new ArrayList<Proc>();


    public Product() {
    }
}
