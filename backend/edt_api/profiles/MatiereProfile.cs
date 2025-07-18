using AutoMapper;
using edt_api.dtos;
using edt_api.models;

namespace edt_api.profiles;

public class MatiereProfile:Profile
{
    public MatiereProfile()
    {
        CreateMap<Matiere, MatiereDto>()
            .ForCtorParam("id", opt => opt.MapFrom(src => src.codeMat))
            .ForCtorParam("nomMat", opt => opt.MapFrom(src => src.nomMat))
            .ForCtorParam("nbH", opt => opt.MapFrom(src => src.nbHor))
            .ForCtorParam("coeff", opt => opt.MapFrom(src => src.coefficient))
            .ForCtorParam("nomEns", opt => opt.MapFrom(src => src.enseignant!.nom))
            .ForCtorParam("prenomEns", opt => opt.MapFrom(src => src.enseignant!.prenom))
            .ForCtorParam("mention", opt => opt.MapFrom(src => src.mention.nomMent))
            .ForCtorParam("niveau", opt => opt.MapFrom(src => src.niveau.intitule));
            

        CreateMap<CreateMatiereDto, Matiere>()
            .ForMember(dest => dest.nomMat, opt => opt.MapFrom(src => src.nomMat))
            .ForMember(dest => dest.nbHor, opt => opt.MapFrom(src => src.nomMat))
            .ForMember(dest => dest.nbHor, opt => opt.MapFrom(src => src.nbH))
            .ForMember(dest => dest.coefficient, opt => opt.MapFrom(src => src.coeff))
            .ForMember(dest => dest.enseignantId, opt => opt.MapFrom(src => src.enseignantId))
            .ForMember(dest => dest.mentionId, opt => opt.MapFrom(src => src.mentionId))
            .ForMember(dest => dest.niveauId, opt => opt.MapFrom(src => src.nivId));

        CreateMap<UpdateMatiereDto, Matiere>()
            .ForMember(dest => dest.nomMat, opt => opt.MapFrom(src => src.nomMat))
            .ForMember(dest => dest.nbHor, opt => opt.MapFrom(src => src.nomMat))
            .ForMember(dest => dest.nbHor, opt => opt.MapFrom(src => src.nbH))
            .ForMember(dest => dest.coefficient, opt => opt.MapFrom(src => src.coeff))
            .ForMember(dest => dest.enseignantId, opt => opt.MapFrom(src => src.enseignantId))
            .ForMember(dest => dest.mentionId, opt => opt.MapFrom(src => src.mentionId))
            .ForMember(dest => dest.niveauId, opt => opt.MapFrom(src => src.nivId));

    }
}