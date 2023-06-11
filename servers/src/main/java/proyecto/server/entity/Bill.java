package proyecto.server.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="Bill")
public class Bill {

	@Id
	@GeneratedValue(strategy= GenerationType.IDENTITY)
	private long idBill;
	
	@Column(name="name", length=20)
	private String proveedor;
	
	@Column(name="presupuesto")
	private float presupuesto;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)  
	@JoinColumn(name = "fk_ListBill", nullable = false)
	@JsonIgnore
	private Lists list;

	public Bill(long idBill, String proveedor, float presupuesto, Lists list) {
		super();
		this.idBill = idBill;
		this.proveedor = proveedor;
		this.presupuesto = presupuesto;
		this.list = list;
	}

	public long getIdBill() {
		return idBill;
	}

	public void setIdBill(long idBill) {
		this.idBill = idBill;
	}

	public String getProveedor() {
		return proveedor;
	}

	public void setProveedor(String proveedor) {
		this.proveedor = proveedor;
	}

	public float getPresupuesto() {
		return presupuesto;
	}

	public void setPresupuesto(float presupuesto) {
		this.presupuesto = presupuesto;
	}

	public Lists getList() {
		return list;
	}

	public void setList(Lists list) {
		this.list = list;
	}

	@Override
	public String toString() {
		return "Bill [idBill=" + idBill + ", proveedor=" + proveedor + ", presupuesto=" + presupuesto + ", list=" + list
				+ "]";
	}
	
	
}
