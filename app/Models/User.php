<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;


class   User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;


    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */

    protected $fillable = [
        'name',
        'email',
        'password',
        'api_token'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */

    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function roles()
    {
        return $this->belongsToMany('App\Models\Role','role_users','user_id','role_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function polices()
    {
        return $this->belongsToMany('App\Models\PatientPolice','patient_police_patient','user_id','patient_police_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function contacts()
    {
        return $this->belongsToMany('App\Models\PatientContact','patient_contacts_patient','user_id','patient_contacts_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function patientCards()
    {
        return $this->belongsToMany('App\Models\PatientCard','patient_cards_users','user_id','patient_card_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function adresses()
    {
        return $this->belongsToMany('App\Models\PatientAdress','patient_adresses_patient','user_id','patient_adress_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */

    public function permissions()
    {
        return $this->belongsToMany('App\Models\Permission','permissions_users','user_id','permission_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */

    public function employerCard()
    {
        return $this->hasOne(EmployerCard::class,'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */

    public function employerDocuments()
    {
        return $this->hasOne(EmployerDocument::class,'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */

    public function employerInfos()
    {
        return $this->hasOne(EmployerInfo::class,'user_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function patientShedules()
    {
        return $this->hasMany(Shedule::class,'patient_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

    public function doctorShedules()
    {
        return $this->hasMany(DoctorShedule::class,'doctor_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */

   public function reviewOrders()
   {
       return $this->hasMany(ReviewOrder::class,'user_id');
   }

}
